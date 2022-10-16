import { peerConnectionManager } from "./peerConnection";
import LocalDropEvent from "./LocalDropEvent";
import {
    EventSendTextData,
    EventSendFilesData,
    EventDownloadFileData,
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
} from "./dataSchema/LocalDropEventData";
import { CLIENT_EVENT_TYPE, PEER_MESSAGE_TYPE } from "../schema";
import websocketManager from "./websocket";
import store from "../redux/store";
import {
    addPeer,
    deletePeer,
    addMessage,
    updateMyUUID,
    addSystemMessage,
    updateSelectedPeer,
    updateSelectedRow,
    updateTableUsers as updateTableUsersCounter,
    updateTableCommentMetadata as updateTableCommentMetadataCounter,
    updateTableNotifications as updateTableNotificationsCounter,
    updateSenderID,
} from "../redux/action";
import { parseChunkAndHeader } from "./peerMessage";
import { getCurrentTime, generateFingerPrint } from "./commonUtil";
import {
    accumulateChunk,
    transferFile,
    isDownloadInProgress,
    handleDataChannelClose,
} from "./downloadManager";
import { run } from "./database/database";
import {
    TABLE_COMMENTS,
    TABLE_COMMENT_METADATA,
    TABLE_NOTIFICATIONS,
    TABLE_SHARING_DATA,
    TABLE_USERS,
} from "./database/schema";

function sendTextToPeer(uuid, text) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_TEXT,
        new EventSendTextData({ uuid, message: text })
    );

    peerConnectionManager.dispatchEvent(event);
}

function sendFileToPeer(uuid, fingerprintedFile) {
    const { file, fingerprint } = fingerprintedFile;

    console.log("sendFileToPeer, file is", file);

    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_FILES,
        new EventSendFilesData({
            uuid,
            message: file.name,
            size: file.size,
            fingerprint,
        })
    );

    peerConnectionManager.dispatchEvent(event);
}

function sendErrorToPeer(uuid, message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.ERROR,
        new EventErrorData({ uuid, message })
    );

    peerConnectionManager.dispatchEvent(event);
}

function sendFilesToPeer(uuid, fingerprintedFiles) {
    fingerprintedFiles.forEach((fingerprintedFile) => {
        sendFileToPeer(uuid, fingerprintedFile);
    });
}

function requestDownloadFile(uuid, data) {
    const { fingerprint } = data;

    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.DOWNLOAD_FILE,
        new EventDownloadFileData({
            uuid,
            fingerprint,
        })
    );

    peerConnectionManager.dispatchEvent(event);
}

function abortDownloadFile(otherUUID) {
    handleDataChannelClose(otherUUID);
}

function connectToPeer(uuid) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.CONNECT,
        new EventConnectData({ uuid })
    );

    peerConnectionManager.dispatchEvent(event);
}

function sendMessageToServer(message) {
    const event = new LocalDropEvent(
        CLIENT_EVENT_TYPE.SEND_MESSAGE,
        new EventSendMessageData({ message })
    );

    websocketManager.dispatchEvent(event);
}

function closeWebSocket() {
    const event = new LocalDropEvent(CLIENT_EVENT_TYPE.CLOSE);

    websocketManager.dispatchEvent(event);
}

function addJoinedPeers(peers) {
    store.dispatch(addPeer(peers));
}

function deleteLeavedPeers(peers) {
    store.dispatch(deletePeer(peers));
}

function addMessagePacket(message) {
    store.dispatch(addMessage(message));
}

function updateUUID(uuid) {
    store.dispatch(updateMyUUID(uuid));
}

function getPeerUUID() {
    return store.getState().peerUUID;
}

function getMyUUID() {
    return store.getState().myUUID;
}

function getFileToTransfer(fingerprint) {
    const filesToTransfer = store.getState().filesToTransfer;

    return filesToTransfer[fingerprint];
}

function transferFileToPeer(fingerprint, uuid) {
    const file = getFileToTransfer(fingerprint);

    if (!file) {
        const message = `[From #${getMyUUID()}]: ${fingerprint} file link has expired`;
        sendErrorToPeer(uuid, message);
        return;
    }

    if (!peerConnectionManager.peerConnections[uuid]) {
        // There is nothing to do in this case..
        const systemMessage =
            `#${uuid} requested download but uuid not found : ` +
            JSON.stringify({ fingerprint, file }, undefined, 2);
        writeSystemMessage(systemMessage);
        return;
    }

    const { dataChannel } = peerConnectionManager.peerConnections[uuid];

    if (isDownloadInProgress(fingerprint)) {
        const { name, size, type } = file;
        const payload = {
            fingerprint,
            file: { name, size, type },
        };
        const message =
            `[From #${getMyUUID()}]: download is in progress ` +
            JSON.stringify(payload, undefined, 2);
        sendErrorToPeer(uuid, message);
        return;
    } else {
        transferFile(fingerprint, file, dataChannel, uuid);
    }
}

function getMessagePacket(fingerprint) {
    // TODO: Make O(1)

    const messagePacket = store
        .getState()
        .messagePackets.find((messagePacket) => {
            const { data } = messagePacket;

            return data.fingerprint === fingerprint;
        });

    return messagePacket;
}

function parsePeerChunk(chunkWithHeader) {
    return parseChunkAndHeader(chunkWithHeader);
}

async function writePeerChunk(chunkWithHeader, uuid) {
    await accumulateChunk(chunkWithHeader, uuid);
}

function writeSystemMessage(message) {
    const systemMessage = {
        message,
        fingerprint: generateFingerPrint(),
        createdAt: getCurrentTime(),
    };

    store.dispatch(addSystemMessage(systemMessage));
}

function updateSelectedPeerUUID(uuid) {
    store.dispatch(updateSelectedPeer(uuid));
}

function updateSelectedRowID(id) {
    store.dispatch(updateSelectedRow(id));
}

function updateTableUsers() {
    store.dispatch(updateTableUsersCounter());
}

function updateTableCommentMetadata() {
    store.dispatch(updateTableCommentMetadataCounter());
}

function updateTableNotifications() {
    store.dispatch(updateTableNotificationsCounter());
}

function updateSender(senderID) {
    store.dispatch(updateSenderID(senderID));
}

async function selectTableUsers() {
    const query = `SELECT * FROM ${TABLE_USERS.name}`;
    console.log("query:", query);

    // need to use try catch?
    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableUsersByID(userID) {
    const query = `SELECT * FROM ${TABLE_USERS.name}
        WHERE ${TABLE_USERS.name}.${TABLE_USERS.fields.id} = "${userID}"`;
    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableUsersWithLatestSharingDataType() {
    const query = `
    SELECT u.*,
        (CASE WHEN s.${TABLE_SHARING_DATA.fields.type} = "LINK" 
        THEN "URL" 
        ELSE s.${TABLE_SHARING_DATA.fields.extension} END) latest_data_type,
    MAX(s.${TABLE_SHARING_DATA.fields.uploaded_at})
  FROM
    ${TABLE_USERS.name} u
  JOIN
    ${TABLE_SHARING_DATA.name} s
  ON
    u.${TABLE_USERS.fields.id} = s.${TABLE_SHARING_DATA.fields.uploader_id}
  GROUP BY
    u.${TABLE_USERS.fields.id}`;

    console.log("selectTableUsersWithLatestSharingDataType, query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function patchTableUsersByID({ name, profile }, userID) {
    if (name == null && profile == null) {
        return;
    }

    let query = `UPDATE ${TABLE_USERS.name} SET `;

    const values = [];

    if (!(name == null)) {
        values.push(`${TABLE_USERS.fields.name} = "${name}"`);
    }
    if (!(profile == null)) {
        values.push(`${TABLE_USERS.fields.profile} = ${profile}`);
    }

    query += values.join(", ");
    query += ` WHERE id = "${userID}"`;

    console.log("patchTableUsersByID, query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableSharingDataWithCommentCount(userID) {
    let query = `SELECT f.*, COUNT(*) as comment_count, 
            f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        GROUP BY f.${TABLE_SHARING_DATA.fields.id};`;

    if (userID && userID !== "") {
        query = `SELECT f.*, COUNT(*) as comment_count,
            f.type as dataType   FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        WHERE f.${TABLE_SHARING_DATA.fields.uploader_id} = "${userID}"
        GROUP BY f.${TABLE_SHARING_DATA.fields.id};`;
    }

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableSharingDataWithCommentCountOrderBy(userID, order) {
    let query = `SELECT f.*, COUNT(*) as comment_count, 
            f.type as dataType FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        GROUP BY f.${TABLE_SHARING_DATA.fields.id}`;

    if (userID && userID !== "") {
        query = `SELECT f.*, COUNT(*) as comment_count,
            f.type as dataType   FROM ${TABLE_SHARING_DATA.name} f 
        LEFT JOIN ${TABLE_COMMENTS.name} c on 
        f.${TABLE_SHARING_DATA.fields.id} = c.${TABLE_COMMENTS.fields.data_id}
        WHERE f.${TABLE_SHARING_DATA.fields.uploader_id} = "${userID}"
        GROUP BY f.${TABLE_SHARING_DATA.fields.id}`;
    }

    if (!!order) {
        const stmt = order === "ASC" ? "ASC" : "DESC";
        query += ` ORDER BY ${TABLE_SHARING_DATA.fields.uploaded_at} ${stmt};`;
    } else {
        query += `;`;
    }

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function deleteTableSharingDataByIDs(sharingDataIDs) {
    if (sharingDataIDs.length === 0) {
        return;
    }

    const naiveQueriesForTableSharingData = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_SHARING_DATA.name} WHERE ${TABLE_SHARING_DATA.fields.id} = "${id}";
    `
    );

    const navieQueriesForTableComments = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_COMMENTS.name} WHERE ${TABLE_COMMENTS.fields.data_id} = "${id}";
    `
    );

    const naiveQueriesForTableCommentMetadata = sharingDataIDs.map(
        (id) => `
        DELETE FROM ${TABLE_COMMENT_METADATA.name} 
        WHERE ${TABLE_COMMENT_METADATA.fields.data_id} = "${id}";
    `
    );

    const query = [
        ...naiveQueriesForTableSharingData,
        ...navieQueriesForTableComments,
        ...naiveQueriesForTableCommentMetadata,
    ].join("\n");

    console.log("deleteTableSharingDataByIDs, query:", query);

    const result = await run(query);
    console.log("deleteTableSharingDataByIDs, result:", result);
    // return result?.[0]?.rows;
}

// TODO(young): Add logic - filter by receiver ID
async function selectTableCommentsByDataID(dataID, receiverID) {
    const query = `SELECT * FROM ${TABLE_COMMENTS.name} 
        WHERE ${TABLE_COMMENTS.fields.data_id} = "${dataID}"
        AND ${TABLE_COMMENTS.fields.receiver_id} = "${receiverID}"
        ORDER BY ${TABLE_COMMENTS.fields.created_at} ASC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableCommentMetadataByDataID(dataID) {
    const query = `SELECT * FROM ${TABLE_COMMENT_METADATA.name}
        WHERE ${TABLE_COMMENT_METADATA.fields.data_id} = "${dataID}";`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

async function selectTableNotifications() {
    const query = `SELECT * FROM ${TABLE_NOTIFICATIONS.name}
        ORDER BY ${TABLE_NOTIFICATIONS.fields.created_at} DESC;`;

    console.log("query:", query);

    const result = await run(query);
    console.log("result:", result);

    return result?.[0]?.rows;
}

export {
    sendTextToPeer,
    sendFilesToPeer,
    sendErrorToPeer,
    requestDownloadFile,
    sendMessageToServer,
    connectToPeer,
    closeWebSocket,
    addJoinedPeers,
    deleteLeavedPeers,
    addMessagePacket,
    updateUUID,
    getPeerUUID,
    getMyUUID,
    getFileToTransfer,
    transferFileToPeer,
    getMessagePacket,
    parsePeerChunk,
    writePeerChunk,
    writeSystemMessage,
    abortDownloadFile,
    updateSelectedPeerUUID,
    updateSelectedRowID,
    updateSender,
    // db interfaces
    updateTableUsers,
    updateTableCommentMetadata,
    updateTableNotifications,
    selectTableUsers,
    selectTableUsersByID,
    selectTableUsersWithLatestSharingDataType,
    patchTableUsersByID,
    selectTableSharingDataWithCommentCount,
    selectTableSharingDataWithCommentCountOrderBy,
    deleteTableSharingDataByIDs,
    selectTableCommentsByDataID,
    selectTableCommentMetadataByDataID,
    selectTableNotifications,
};
