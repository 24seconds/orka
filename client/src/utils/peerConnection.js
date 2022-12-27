// TODO(young): remove this later
/* eslint-disable indent */
import { MESSAGE_TYPE, CLIENT_EVENT_TYPE, PEER_MESSAGE_TYPE } from "../schema";
import {
    messageTextData,
    messageFileData,
    messageDownloadData,
    messageErrorData,
    messageUserInfoData,
    messageUploadLink,
} from "./dataSchema/PeerMessageData";
import { createMessage } from "./message";
import { createPeerMessage, parsePeerMessage } from "./peerMessage";
import { createMessagePacket } from "./messagePacket";
import { generateFingerPrint } from "./commonUtil";
import {
    sendMessageToServer,
    addJoinedPeers,
    deleteLeavedPeers,
    createMyUserInfo,
    getMyUUID,
    addMessagePacket,
    transferFileToPeer,
    writePeerChunk,
    writeSystemMessage,
    abortDownloadFile,
    connectToPeer,
    selectTableUsersMyself,
    upsertTableUser,
    deleteTableUserByID,
    upsertTableSharingData,
} from "./localApi";
import { EventSendUserInfo } from "./dataSchema/LocalDropEventData";
import LocalDropEvent from "./LocalDropEvent";
import { initGlueSQL } from "./database/database";

function createPeerConnection(uuid) {
    console.log("createPeerConnection called", uuid);

    const peerConnection = new RTCPeerConnection();

    // TODO: Handle createDataChannel error later
    const dataChannel = peerConnection.createDataChannel(
        "localdropDataChannel",
        {
            negotiated: true,
            id: 0,
        }
    );

    console.log("dataChannel:", dataChannel);

    dataChannel.binaryType = "arraybuffer";
    dataChannel.onopen = async (event) => {
        console.log("dataChanel onopen called", uuid);

        handleDataChannelStatusChange(event, uuid);

        const e = new LocalDropEvent(
            CLIENT_EVENT_TYPE.SEND_USER_INFO,
            new EventSendUserInfo({ uuid })
        );

        console.log("onopen, e:", e);

        (await peerConnectionManager).dispatchEvent(e);
    };

    dataChannel.onclose = (event) => {
        console.log(`data channel ${uuid} closed`);
        writeSystemMessage("dataChannel closed");
        handleDataChannelStatusChange(event, uuid);

        abortDownloadFile(uuid);
    };

    dataChannel.onmessage = (event) => {
        // console.log('[Message from DataChannel]: ', event);
        handleDataChannelMessage(event, uuid);
    };

    dataChannel.onerror = (event) => {
        const { code, message, name } = (event && event.error) || {};
        const payload = JSON.stringify({ message, code, name }, undefined, 2);

        const systemMessage = `[peer ${uuid}]: dataChannel error: ` + payload;
        console.log("dataChannel error, dataChannel is ", dataChannel);
        console.log("dataChannel error, event is ", event);
        console.log("datachannel error, systemMessage is ", systemMessage);
        writeSystemMessage(systemMessage);
    };

    peerConnection.onicecandidate = (event) => {
        console.log(`[peer ${uuid}]: onicecandidate, event is `, event);

        if (event.candidate) {
            // Send the candidate to the remote peer
            const message = createMessage(MESSAGE_TYPE.ICE_CANDIDATE, {
                fromUUID: getMyUUID(),
                toUUID: uuid,
                ice: event.candidate,
            });

            sendMessageToServer(message);
        } else {
            // All ICE candidates have been sent
        }
    };

    peerConnection.onconnectionstatechange = (event) => {
        console.log(
            `[peer ${uuid}]: onconnectionstatechange, event is `,
            event
        );
        console.log(
            `[peer ${uuid}]: peerConnection.connectionState is `,
            peerConnection.connectionState
        );

        switch (peerConnection.connectionState) {
            case "connecting":
                // do nothing
                break;
            case "connected":
                // do nothing
                break;
            case "disconnected":
                break;
            case "failed":
                writeSystemMessage(
                    "onconnectionstatechange, peerConnection failed"
                );
                break;
            case "closed":
                // TODO: Recreate PeerConnectionManager
                writeSystemMessage(
                    "onconnectionstatechange, peerConnection closed"
                );
                break;
            default:
                writeSystemMessage(
                    "onconnectionstatechange, peerConnection.connectionState: " +
                        peerConnection.connectionState
                );
        }
    };

    return { peerConnection, dataChannel };
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

    if (messageType === PEER_MESSAGE_TYPE.UPLOAD_LINK) {
        const { sharingData } = data;
        await upsertTableSharingData({ sharingData })

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
        return;
    }

    if (messageType === PEER_MESSAGE_TYPE.ERROR) {
        const { message } = data;

        writeSystemMessage(message);
        return;
    }
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

// TODO: Handle error later
async function createOffer(peerConnection) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    return peerConnection.localDescription;
}

async function setRemoteOffer(peerConnection, offer) {
    console.log("setOffer called");
    await peerConnection.setRemoteDescription(offer);

    console.log(peerConnection);
}

// TODO: Handle error later
async function createAnswer(peerConnection) {
    const answer = await peerConnection.createAnswer();
    console.log("createAnswer, answer is ", answer);

    await peerConnection.setLocalDescription(answer);

    return peerConnection.localDescription;
}

async function setRemoteAnswer(peerConnection, answer) {
    await peerConnection.setRemoteDescription(answer);
}

async function initializePeerConnections(peerConnectionManager, peers) {
    const connectionArr = [];

    // connectToPeer
    

    for (const peerUUID of peers) {
        if (!peerConnectionManager.peerConnections[peerUUID]) {
            // initialize peerConnection
            const { peerConnection, dataChannel } =
                createPeerConnection(peerUUID);

            connectionArr.push({ uuid: peerUUID, peerConnection, dataChannel });
        }
    }

    return connectionArr;
}

function addClientEventTypeEventListener(peerConnectionManager) {
    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.CONNECT,
        async (event) => {
            const { uuid: toUUID } = event;

            console.log("CLIENT_EVENT_TYPE.CONNECT called");

            if (peerConnectionManager.peerConnections[toUUID]) {
                // already exist
                console.log(
                    `[peerConnectionManger]: ${CLIENT_EVENT_TYPE.CONNECT}, peerConnection already exist`
                );
                // return;
            }

            const { peerConnection, dataChannel } =
                peerConnectionManager.peerConnections[toUUID] ||
                createPeerConnection(toUUID);
            peerConnectionManager.peerConnections[toUUID] = {
                peerConnection,
                dataChannel,
            };

            // check if peerConnection is done => if done, do nothing
            if (peerConnection.connectionState === "connected") {
                console.log(
                    `[peerConnectionManger]: ${CLIENT_EVENT_TYPE.CONNECT}, peerConnection already connected`
                );
                return;
            }

            try {
                const myUUID = peerConnectionManager.uuid;
                const offer = await createOffer(peerConnection);
                const message = createMessage(MESSAGE_TYPE.OFFER, {
                    fromUUID: myUUID,
                    toUUID,
                    offer,
                });

                sendMessageToServer(message);
            } catch (error) {
                writeSystemMessage(JSON.stringify(error, undefined, 2));
            }
        }
    );

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.SEND_USER_INFO,
        async (event) => {
            const { uuid: toUUID } = event;
            console.log("SEND_USER_INFO called", event);

            // prepare user info
            const myInfo = (await selectTableUsersMyself())?.[0];

            // TODO(young): handle this later
            if (!peerConnectionManager.peerConnections[toUUID]) {
                writeSystemMessage(`can not find peer: #${toUUID}`);
                return;
            }

            console.log("myInfo:", myInfo);

            const { dataChannel } =
                peerConnectionManager.peerConnections[toUUID];
            const data = new messageUserInfoData({
                message: myInfo,
            });

            const peerMessage = createPeerMessage(
                PEER_MESSAGE_TYPE.USER_INFO,
                data
            );

            dataChannel.send(peerMessage);

            if (dataChannel.readyState !== "open") {
                writeSystemMessage(
                    "dataChannel not opened!, try to clikc the peer again!\ndataChannel.readyState: " +
                        dataChannel.readyState
                );
                console.log("dataChannel not opened!, click the peer again!");
                return;
            }

            dataChannel.send(peerMessage);

            // TODO(young): In orka, storing message packet is not necessary. Remove this when refactoring
            // const messagePacket = createMessagePacket({
            //     source: getMyUUID(),
            //     destination: toUUID,
            //     data,
            //     messageType: PEER_MESSAGE_TYPE.TEXT,
            // });

            // addMessagePacket(messagePacket);
        }
    );

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.UPLOAD_LINK,
        async (event) => {
            const { sharingData } = event;
            console.log('CLIENT_EVENT_TYPE.UPLOAD_LINK, data:', sharingData, peerConnectionManager, !!peerConnectionManager.peerConnections);

            if (peerConnectionManager.peerConnections == null ) {
                writeSystemMessage(`there are no peer connections`);   
                return;
            }

            console.log("peerConnectionManager.peerConnections:", peerConnectionManager.peerConnections);

            for (const uuid of Object.keys(peerConnectionManager.peerConnections)) {
                const { dataChannel } = peerConnectionManager.peerConnections[uuid];
                const data = new messageUploadLink({ sharingData });

                const peerMessage = createPeerMessage(PEER_MESSAGE_TYPE.UPLOAD_LINK, data);

                console.log("CLIENT_EVENT_TYPE.UPLOAD_LINK, message is ", peerMessage);

                dataChannel.send(peerMessage);

                if (dataChannel.readyState !== "open") {
                    console.log(`dataChannel (${dataChannel.readyState}) not opened for uuid: ${uuid}!, click the peer again!`);
                    continue;
                }
    
                // dataChannel.send(peerMessage);
            }
        }
    );

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.SEND_TEXT,
        (event) => {
            const { uuid, message } = event;

            if (!peerConnectionManager.peerConnections[uuid]) {
                writeSystemMessage(`can not find peer: #${uuid}`);
                return;
            }

            const { dataChannel } = peerConnectionManager.peerConnections[uuid];
            const data = new messageTextData({
                message,
                size: message.length,
                fingerprint: generateFingerPrint(),
            });

            const peerMessage = createPeerMessage(PEER_MESSAGE_TYPE.TEXT, data);

            console.log(
                "CLIENT_EVENT_TYPE.SEND_TEXT, message is ",
                peerMessage
            );

            console.log("dataChannel is ", dataChannel);
            console.log("dataChannel.readyState is ", dataChannel.readyState);

            if (dataChannel.readyState !== "open") {
                writeSystemMessage(
                    "dataChannel not opened!, try to clikc the peer again!\ndataChannel.readyState: " +
                        dataChannel.readyState
                );
                console.log("dataChannel not opened!, click the peer again!");
                return;
            }

            dataChannel.send(peerMessage);

            const messagePacket = createMessagePacket({
                source: getMyUUID(),
                destination: uuid,
                data,
                messageType: PEER_MESSAGE_TYPE.TEXT,
            });

            addMessagePacket(messagePacket);
        }
    );

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.SEND_FILES,
        (event) => {
            const { uuid, message, size, fingerprint } = event;

            if (!peerConnectionManager.peerConnections[uuid]) {
                writeSystemMessage(`can not find peer: #${uuid}`);
                return;
            }

            const { dataChannel } = peerConnectionManager.peerConnections[uuid];
            const data = new messageFileData({ fingerprint, size, message });

            const peerMessage = createPeerMessage(PEER_MESSAGE_TYPE.FILE, data);

            console.log(
                "CLIENT_EVENT_TYPE.SEND_FILES, message is ",
                peerMessage
            );

            console.log("dataChannel is ", dataChannel);
            console.log("dataChannel.readyState is ", dataChannel.readyState);

            if (dataChannel.readyState !== "open") {
                writeSystemMessage(
                    "dataChannel not opened!, try to clikc the peer again!\ndataChannel.readyState: " +
                        dataChannel.readyState
                );
                console.log("dataChannel not opened!, click the peer again!");
                return;
            }

            dataChannel.send(peerMessage);

            const messagePacket = createMessagePacket({
                source: getMyUUID(),
                destination: uuid,
                data,
                messageType: PEER_MESSAGE_TYPE.FILE,
            });

            addMessagePacket(messagePacket);
        }
    );

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.DOWNLOAD_FILE,
        (event) => {
            const { uuid, fingerprint } = event;

            if (!peerConnectionManager.peerConnections[uuid]) {
                writeSystemMessage(`can not find peer: #${uuid}`);
                return;
            }

            const { dataChannel } = peerConnectionManager.peerConnections[uuid];
            const data = new messageDownloadData({ fingerprint });

            const peerMessage = createPeerMessage(
                PEER_MESSAGE_TYPE.DOWNLOAD,
                data
            );

            console.log(
                "CLIENT_EVENT_TYPE.DOWNLOAD_FILE, message is ",
                peerMessage
            );

            console.log("dataChannel is ", dataChannel);
            console.log("dataChannel.readyState is ", dataChannel.readyState);

            if (dataChannel.readyState !== "open") {
                writeSystemMessage(
                    `CLIENT_EVENT ${CLIENT_EVENT_TYPE.DOWNLOAD_FILE}: dataChannel not opened!` +
                        `dataChannel.readyState: ${dataChannel.readyState}`
                );
                console.log("dataChannel not opened!");
                return;
            }

            dataChannel.send(peerMessage);
            // TODO: should I notify that peerMessage has been sent well?
        }
    );

    peerConnectionManager.addEventListener(CLIENT_EVENT_TYPE.ERROR, (event) => {
        const { uuid, message } = event;

        if (!peerConnectionManager.peerConnections[uuid]) {
            writeSystemMessage(`can not find peer: #${uuid}`);
            return;
        }

        const { dataChannel } = peerConnectionManager.peerConnections[uuid];
        const data = new messageErrorData({ message });

        const peerMessage = createPeerMessage(PEER_MESSAGE_TYPE.ERROR, data);

        console.log("CLIENT_EVENT_TYPE.ERROR, message is ", peerMessage);

        console.log("dataChannel is ", dataChannel);
        console.log("dataChannel.readyState is ", dataChannel.readyState);

        if (dataChannel.readyState !== "open") {
            writeSystemMessage(
                `CLIENT_EVENT ${CLIENT_EVENT_TYPE.ERROR}: dataChannel not opened!`
            );
            console.log("dataChannel not opened!");
            return;
        }

        dataChannel.send(peerMessage);
    });

    peerConnectionManager.addEventListener(
        CLIENT_EVENT_TYPE.RECONNECT,
        (event) => {
            const { uuid } = event;
            // TODO: DO it later
        }
    );
}

function addMessageTypeEventListener(peerConnectionManager) {
    peerConnectionManager.addEventListener(MESSAGE_TYPE.UUID, async (event) => {
        const { uuid } = event;

        peerConnectionManager.uuid = uuid;
        // TODO(young): consider in case of calling this event handler more than twice.
        // TODO(young): create my user info regardless of signaling server connection.
        await createMyUserInfo(uuid);
    });

    // peer list 받았을 때 connection을 다 바로 맺네?
    peerConnectionManager.addEventListener(MESSAGE_TYPE.PEERS, async (event) => {
        const { peers } = event;
        const filteredPeers = peers.filter(
            (peerUUID) => peerUUID !== peerConnectionManager.uuid
        );

        console.log("MESSAGE_TYPE.PEERS peers", peers);

        const connectionArr = await initializePeerConnections(
            peerConnectionManager,
            filteredPeers
        );

        console.log("connectionArr:", connectionArr);

        for (const connection of connectionArr) {
            const { uuid, peerConnection, dataChannel } = connection;

            peerConnectionManager.peerConnections[uuid] = {
                peerConnection,
                dataChannel,
            };

            await connectToPeer(uuid);
        }

        // TODO: Inform this event to store
        addJoinedPeers(filteredPeers);
    });

    // peer가 join 했다고 알림을 받으면 마찬가지로 connection을 맺으려고 하네?
    peerConnectionManager.addEventListener(MESSAGE_TYPE.JOIN, async (event) => {
        const { peers } = event;
        const filteredPeers = peers.filter(
            (peerUUID) => peerUUID !== peerConnectionManager.uuid
        );

        const connectionArr = await initializePeerConnections(
            peerConnectionManager,
            filteredPeers
        );

        for (const connection of connectionArr) {
            const { uuid, peerConnection, dataChannel } = connection;

            peerConnectionManager.peerConnections[uuid] = {
                peerConnection,
                dataChannel,
            };
        }

        // TODO: Inform this event to store
        addJoinedPeers(filteredPeers);

        // if (filteredPeers?.length > 0) {
        //     connectToPeer(filteredPeers[0]);
        // }
    });

    peerConnectionManager.addEventListener(
        MESSAGE_TYPE.LEAVE,
        async (event) => {
            const { peers } = event;
            const filteredPeers = peers.filter(
                (peerUUID) => peerUUID !== peerConnectionManager.uuid
            );

            console.log("LEAVE called", filteredPeers);

            // tear down and delete
            for (const peerUUID of filteredPeers) {
                if (!peerConnectionManager.peerConnections[peerUUID]) {
                    continue;
                }

                const { peerConnection, dataChannel } =
                    peerConnectionManager.peerConnections[peerUUID];

                console.log(
                    "[LEAVE]: peerConnectionManager.peerConnections[peerUUID] is ",
                    peerConnectionManager.peerConnections[peerUUID]
                );

                peerConnection.close();
                dataChannel.close();

                delete peerConnectionManager.peerConnections[peerUUID];

                // delete from database
                await deleteTableUserByID(peerUUID);
            }

            deleteLeavedPeers(filteredPeers);
        }
    );

    peerConnectionManager.addEventListener(
        MESSAGE_TYPE.OFFER,
        async (event) => {
            const { fromUUID, toUUID, offer, timeStamp } = event;

            console.log(
                "peerConnectionManager.peerConnections[fromUUID] is",
                peerConnectionManager.peerConnections[fromUUID]
            );

            // TODO: Reject of Accept offer depend on timeStamp
            // Maybe.. need to use websocketManager to send message back
            if (!peerConnectionManager.peerConnections[fromUUID]) {
                console.log(
                    "offer, peerConnectionManager.peerConnections[fromUUID] not exist",
                    peerConnectionManager
                );
                return;
            }

            const { peerConnection } =
                peerConnectionManager.peerConnections[fromUUID];

            try {
                await setRemoteOffer(peerConnection, offer);

                const answer = await createAnswer(peerConnection);
                const message = createMessage(MESSAGE_TYPE.ANSWER, {
                    fromUUID: toUUID,
                    toUUID: fromUUID,
                    answer,
                });

                sendMessageToServer(message);
            } catch (err) {
                writeSystemMessage(JSON.stringify(err, undefined, 2));
            }
        }
    );

    peerConnectionManager.addEventListener(
        MESSAGE_TYPE.ANSWER,
        async (event) => {
            const { fromUUID, toUUID, answer, timeStamp } = event;

            if (!peerConnectionManager.peerConnections[fromUUID]) {
                console.log(
                    "answer, peerConnectionManager.peerConnections[fromUUID] not exist"
                );
                return;
            }

            console.log("answer is ", answer);

            const { peerConnection } =
                peerConnectionManager.peerConnections[fromUUID];
            await setRemoteAnswer(peerConnection, answer);
        }
    );

    peerConnectionManager.addEventListener(MESSAGE_TYPE.ERROR, (event) => {
        // handle error later

        const { message } = event;
        writeSystemMessage(message);
    });

    peerConnectionManager.addEventListener(
        MESSAGE_TYPE.ICE_CANDIDATE,
        async (event) => {
            const { fromUUID, toUUID, ice } = event;

            console.log("ICE_CANDIDATE, event is ", event);

            if (!peerConnectionManager.peerConnections[fromUUID]) {
                console.log("ICE CANDIDATE, peerConnection not exist");
                return;
            }

            const { peerConnection, dataChannel } =
                peerConnectionManager.peerConnections[fromUUID];
            await peerConnection.addIceCandidate(ice);
        }
    );
}

async function createPeerConnectionManager() {
    await initGlueSQL();

    const peerConnectionManager = {
        uuid: null,
        peerConnections: {},
        events: {},
    };

    peerConnectionManager.addEventListener = (eventType, callback) => {
        // extract event type and do something here

        peerConnectionManager.events[eventType] =
            peerConnectionManager.events[eventType] || [];
        peerConnectionManager.events[eventType].push(callback);
    };

    peerConnectionManager.dispatchEvent = (event) => {
        const eventType = event.type;
        const eventCallbacks = peerConnectionManager.events[eventType];

        if (!eventCallbacks) {
            console.log(
                `peerConnectionManager does not handle event: ${eventType}`
            );
            return;
        }

        for (const callback of eventCallbacks) {
            callback(event);
        }
    };

    addMessageTypeEventListener(peerConnectionManager);
    addClientEventTypeEventListener(peerConnectionManager);

    return peerConnectionManager;
}

const peerConnectionManager = createPeerConnectionManager();
export { peerConnectionManager, createPeerConnectionManager };
