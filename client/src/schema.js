import {
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
} from "./utils/dataSchema/LocalDropEventData";

// SIGNALING_MESSAGE_TYPE defines message from/to signaling server
export const SIGNALING_MESSAGE_TYPE = {
    UUID: "UUID",
    PEERS: "PEERS",
    JOIN: "JOIN",
    LEAVE: "LEAVE",
    OFFER: "OFFER",
    ANSWER: "ANSWER",
    PING: "PING",
    PONG: "PONG",
    ERROR: "ERROR",
    ICE_CANDIDATE: "ICE_CANDIDATE",
};

const messageSchema = {
    messageSchema: {
        messageType: "String",
        data: "Json String. Type is one of dataSchema",
    },
};

const dataSchema = {
    errorDataSchema: {
        message: "string",
    },
    offerDataSchema: {
        fromUUID: "string",
        toUUID: "string",
        timeStamp: "time string, ISO format",
        offer: {
            type: "string",
            sdp: "string",
        },
    },
    answerDataSchema: {
        fromUUID: "string",
        toUUID: "string",
        timeStamp: "time string, ISO format",
        answer: {
            // TODO: CHECK answer schema!!!
            type: "string",
            sdp: "string",
        },
    },
    pingpongDataSchema: {
        message: "string",
    },
    uuidDataSchema: {
        uuid: "string",
    },
    peersDataSchema: {
        peers: "array of string",
    },
    joinDataSchema: {
        peers: "array of string",
    },
    leaveDataSchema: {
        peers: "array of string",
    },
    iceCandidateDataSchema: {
        fromUUID: "string",
        toUUID: "string",
        ice: "string",
    },
    peerTextDataSchema: {
        message: "string",
    },
    peerFileDataSchema: {
        message: "string",
        fingerprint: "string",
        size: "long",
    },
};

// CLIENT_EVENT_TYPE defines event occurred in client app
export const CLIENT_EVENT_TYPE = {
    CONNECT: "CONNECT",
    // send my user info to peer
    SEND_USER_INFO: "SEND_USER_INFO",
    REQUEST_DATA_LIST: "REQUEST_DATA_LIST",
    RESPONE_DATA_LIST: "RESPONE_DATA_LIST",
    DOWNLOAD_FILE: "DOWNLOAD_FILE",
    RECONNECT: "RECONNECT",
    SEND_MESSAGE_TO_SIGNALING_SERVER: "SEND_MESSAGE_TO_SIGNALING_SERVER",
    CLOSE: "CLOSE",
    ERROR: "ERROR",
    UPLOAD_SHARING_DATA: "UPLOAD_SHARING_DATA",
    UPDATE_USER: "UPDATE_USER",
};

const clientEventDataSchema = {
    connectDataSchema: EventConnectData,
    sendMessageDataSchema: EventSendMessageData,
    errorDataSchema: EventErrorData,
};

// PEER_MESSAGE_TYPE defines event occurred from outside - peer connected by webRTC
export const PEER_MESSAGE_TYPE = {
    USER_INFO: "USER_INFO",
    REQUEST_DATA_LIST: "REQUEST_DATA_LIST",
    RESPONE_DATA_LIST: "RESPONE_DATA_LIST",
    UPLOAD_SHARING_DATA: "UPLOAD_SHARING_DATA",
    UPDATE_USER: "UPDATE_USER",
    ERROR: "ERROR",
    DOWNLOAD: "DOWNLOAD",
    PEER_INFO: "PEER_INFO",
};

const peerMessageSchema = {
    messageSchema: {
        messageType: "String",
        data: "Json String. Type is one of peerMessageDataSchema",
    },
};

const peerMessageDataSchema = {
    textDataSchema: { message: "string" },
    fileDataSchema: {
        message: "string",
        fingerprint: "string",
    },
    downloadDataSchema: { fingerprint: "string" },
    erroDataSchema: { message: "string" },
};

const meesagePacketDownloadHeaderSchema = {
    fingerprint: "35 bytes",
};

const peerConnectionMangerSchema = {
    uuid: "string",
    peerConnections: {
        ["otherPeerUUid"]: {
            peerConnection: "RTCPeerConnection",
            dataChannel: "RTCDataChannel",
        },
    },
};

const systemMessageSchema = {
    message: "string",
    fingerprint: "string",
    createdAt: "time string",
};
