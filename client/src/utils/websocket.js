import { MESSAGE_TYPE, CLIENT_EVENT_TYPE } from "../schema";
import {
    SOCKET_STATE,
    SOCKET_STATE_CODE,
    WEBSOCKET_CLOSE_EVENT_CODE,
} from "./dataSchema/WebSocketData";
import { createMessage, parseMessage } from "./message";
import { peerConnectionManager } from "./peerConnection";
import LocalDropEvent from "./LocalDropEvent";
import { writeSystemMessage, getMyUUID } from "./localApi";

function createWebSocketConnection(url) {
    const socket = new WebSocket(url);

    socket.addEventListener("open", async function (event) {
        const message = createMessage(MESSAGE_TYPE.PING, {
            message: "ping, hello server!",
        });
        socket.send(message);
    });

    socket.addEventListener("message", async function (rawMessage) {
        console.log("[Message form server], event is ", rawMessage);
        console.log("[Message from server] ", rawMessage.data);

        const message = parseMessage(rawMessage.data);

        // handle message depends on messageType
        handleMessage(message, socket);
    });

    socket.addEventListener("close", (event) => {
        // TODO: try reconnect depend on network state and close event code
        const { code, reason, wasClean } = event;
        const payload = {
            eventType: "CLOSE",
            code,
            reason,
            wasClean,
        };

        if (WEBSOCKET_CLOSE_EVENT_CODE[code]) {
            const { name, description } = WEBSOCKET_CLOSE_EVENT_CODE[code];
            payload.name = name;
            payload.description = description;
        }

        const systemMessage =
            "Websocket connection closed, " +
            JSON.stringify(payload, undefined, 2);
        writeSystemMessage(systemMessage);
    });

    socket.addEventListener("error", (event) => {
        console.log("websocket error, event is ", event);

        const payload = {
            eventType: "ERROR",
            event,
        };

        writeSystemMessage(
            "websocket error: " + JSON.stringify(payload, undefined, 2)
        );
    });

    return socket;
}

// handleMessage handles message from signaling server.
async function handleMessage(message, socket) {
    const { messageType, data } = message;

    console.log("handleMessage, messageType is ", messageType);
    console.log("handleMessage, data is ", data);

    if (messageType === MESSAGE_TYPE.UUID) {
        const { uuid } = data;

        // create metadata

        // send user data to peerConnection manager?

        // send message to signaling server?

        const event = new LocalDropEvent(messageType, { uuid });
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.PEERS) {
        const { peers } = data;

        const event = new LocalDropEvent(messageType, { peers });
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.JOIN) {
        const { peers } = data;

        const event = new LocalDropEvent(messageType, { peers });
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.LEAVE) {
        const { peers } = data;

        const event = new LocalDropEvent(messageType, { peers });
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.OFFER) {
        const event = new LocalDropEvent(messageType, data);
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.ANSWER) {
        const event = new LocalDropEvent(messageType, data);
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.PING) {
        const myUUID = getMyUUID();
        const message = createMessage(MESSAGE_TYPE.PONG, {
            message: `[Client]: Pong!, uuid: #${myUUID}`,
        });

        socket.send(message);

        return;
    }

    if (messageType === MESSAGE_TYPE.PONG) {
        const { message } = data;

        console.log(`[pong from server]: ${message}`);

        return;
    }

    if (messageType === MESSAGE_TYPE.ERROR) {
        // show error!
        const errorMessage = data["message"];

        const event = new LocalDropEvent(messageType, {
            message: errorMessage,
        });
        (await peerConnectionManager).dispatchEvent(event);

        return;
    }

    if (messageType === MESSAGE_TYPE.ICE_CANDIDATE) {
        const event = new LocalDropEvent(messageType, data);

        (await peerConnectionManager).dispatchEvent(event);
        return;
    }
}

function addCustomMessageTypeEventListener(webSocketManager) {
    webSocketManager.addEventListener(
        CLIENT_EVENT_TYPE.SEND_MESSAGE,
        (event) => {
            const { message } = event;

            webSocketManager.send(message);
        }
    );

    webSocketManager.addEventListener(CLIENT_EVENT_TYPE.CLOSE, (event) => {
        webSocketManager.close();
    });
}

function createWebSocketManager(url) {
    const webSocketManager = {
        socket: createWebSocketConnection(url),
        state: "", // not sure. maybe doesn't need
        events: {},
    };

    webSocketManager.addEventListener = (eventType, callback) => {
        webSocketManager.events[eventType] =
            webSocketManager.events[eventType] || [];
        webSocketManager.events[eventType].push(callback);
    };

    webSocketManager.dispatchEvent = (event) => {
        const eventType = event.type;
        const eventCallbacks = webSocketManager.events[eventType];

        if (!eventCallbacks) {
            console.log(`websocketManager does not handle event: ${eventType}`);
            return;
        }

        for (const callback of eventCallbacks) {
            callback(event);
        }
    };

    webSocketManager.send = (message) => {
        const socket = webSocketManager.socket;

        if (socket.readyState !== SOCKET_STATE.OPEN) {
            // TODO: Notify to user
            const message =
                `websocket it not opened! state: ` +
                SOCKET_STATE_CODE[socket.readyState];
            writeSystemMessage(message);
        }

        webSocketManager.socket.send(message);
    };

    webSocketManager.close = () => {
        webSocketManager.socket.close();
    };

    return webSocketManager;
}

const url = process.env.REACT_APP_WEB_SOCKET_URL || "ws://localhost:4000";
const websocketManager = createWebSocketManager(url);
addCustomMessageTypeEventListener(websocketManager);

export default websocketManager;
