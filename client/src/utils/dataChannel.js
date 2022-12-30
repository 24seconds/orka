import { parsePeerMessage } from "./peerMessage";

import { CLIENT_EVENT_TYPE, PEER_MESSAGE_TYPE } from "../schema";
import { EventSendUserInfo } from "./dataSchema/LocalDropEventData";
import {
    writeSystemMessage,
    abortDownloadFile,
    writePeerChunk,
    upsertTableUser,
    selectTableSharingDataByUserID,
    getMyUUID,
    notifySharingDataToPeer,
    upsertTableSharingData,
    patchTableUsersByID,
    addMessagePacket,
    transferFileToPeer,
    selectTableSharingDataByID,
    patchTableSharingDataByID,
    notifySharingData,
} from "./localApi";
import LocalDropEvent from "./LocalDropEvent";
import { createMessagePacket } from "./messagePacket";

function registerDataChannelEventOnOpen(
    peerConnectionManager,
    dataChannel,
    uuid
) {
    dataChannel.onopen = async (event) => {
        console.log("dataChanel onopen called", uuid);

        handleDataChannelStatusChange(event, uuid);

        const e = new LocalDropEvent(
            CLIENT_EVENT_TYPE.SEND_USER_INFO,
            new EventSendUserInfo({ uuid })
        );

        (await peerConnectionManager).dispatchEvent(e);

        const e2 = new LocalDropEvent(
            CLIENT_EVENT_TYPE.REQUEST_DATA_LIST,
            null
        );

        (await peerConnectionManager).dispatchEvent(e2);
    };
}

function registerDataChannelEventOnClose(dataChannel, uuid) {
    dataChannel.onclose = (event) => {
        console.log(`data channel ${uuid} closed`);
        writeSystemMessage("dataChannel closed");
        handleDataChannelStatusChange(event, uuid);

        abortDownloadFile(uuid);
    };
}

function handleDataChannelStatusChange(event, uuid) {
    console.log(
        `[peer ${uuid}]: handleDataChannelStatusChange, event is `,
        event
    );
    const { type: eventType } = event;

    // TODO: Delete dataChannel in peerConnectionManager
    if (eventType === "close") {
        const systemMessage = `[peer #${uuid}]: dataChannel closed `;
        writeSystemMessage(systemMessage);
    }
}

async function handleDataChannelMessage(event, uuid) {
    if (typeof event.data !== "string") {
        const arrayBuffer = event.data;

        await writePeerChunk(arrayBuffer, uuid);

        return;
    }

    const message = parsePeerMessage(event.data);

    console.log(
        `[peer ${uuid}]: handleDataChannelMessage, message is `,
        message
    );

    const { messageType, data } = message;

    if (messageType === PEER_MESSAGE_TYPE.USER_INFO) {
        // upsert to database
        const { message } = data;

        console.log("upsert user!", data);

        if (!!message && Object.keys(message).length === 3) {
            await upsertTableUser(message);
        }

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.REQUEST_DATA_LIST) {
        const sharingDataList = await selectTableSharingDataByUserID(
            getMyUUID()
        );

        // make message and send back with data
        for (const sharingData of sharingDataList) {
            await notifySharingDataToPeer(sharingData, uuid);
        }

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.RESPONE_DATA_LIST) {
        const { sharingData } = data;
        await upsertTableSharingData({ sharingData });

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.UPLOAD_LINK) {
        const { sharingData } = data;
        await upsertTableSharingData({ sharingData });

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.UPDATE_USER) {
        const { user } = data;
        const { id: userID, name, profile } = user;
        await patchTableUsersByID({ name, profile }, userID);

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.TEXT) {
        const messagePacket = createMessagePacket({
            source: uuid,
            destination: getMyUUID(),
            data,
            messageType,
        });

        console.log(
            "[handleDataChannelMessage]: messagePacket is ",
            messagePacket
        );
        addMessagePacket(messagePacket);

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.FILE) {
        const messagePacket = createMessagePacket({
            source: uuid,
            destination: getMyUUID(),
            data,
            messageType,
        });

        console.log(
            "[handleDataChannelMessage]: messagePacket is ",
            messagePacket
        );
        addMessagePacket(messagePacket);

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.DOWNLOAD) {
        const { fingerprint } = data;
        // transfer file
        transferFileToPeer(fingerprint, uuid);

        // update download count, notify to peers
        const sharingData = await selectTableSharingDataByID(fingerprint);
        if (sharingData) {
            const updated = await patchTableSharingDataByID(
                { statusCount: sharingData.status_count + 1 },
                fingerprint
            );
            await notifySharingData(updated);
        }

        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.ERROR) {
        const { message } = data;

        writeSystemMessage(message);
        return;
    }
}

export { registerDataChannelEventOnOpen, registerDataChannelEventOnClose, handleDataChannelMessage};
