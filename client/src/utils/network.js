import config from '../config';
import { MESSAGE_TYPE, CLIENT_EVENT_TYPE } from '../schema';
import { createMessage, parseMessage } from './message';
import { peerConnectionManager } from './peerConnection';
import LocalDropEvent from './LocalDropEvent';

const SOCKET_STATE = {
  INITIAL: 1,
  CONNECTED: 2,
  CLOSED: 3,
  ERROR: 4,
};


function createWebSocketConnection(url) {
  const socket = new WebSocket(url);

  socket.addEventListener('open', async function (event) {
    const message = createMessage(MESSAGE_TYPE.PING, { message: 'ping, hello server!' })
    socket.send(message);
  });

  socket.addEventListener('message', async function (rawMessage) {
    console.log('[Message form server], event is ', rawMessage);
    console.log('[Message from server] ', rawMessage.data);
  
    const message = parseMessage(rawMessage.data);
  
    // handle message depends on messageType
    handleMessage(message, socket);
  });

  socket.addEventListener('onclose', function () {
    // TODO: handle onclsoe case and try reconnect depend on network state
  });

  return socket;
}

async function handleMessage(message, socket) {
  const { messageType, data } = message;

  console.log('handleMessage, messageType is ', messageType);
  console.log('handleMessage, data is ', data);

  if (messageType === MESSAGE_TYPE.UUID) {
    const { uuid } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.UUID, { uuid });
    peerConnectionManager.dispatchEvent(event);

    return;
  }

  if (messageType === MESSAGE_TYPE.PEERS) {
    const { peers } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.PEERS, { peers });
    peerConnectionManager.dispatchEvent(event);

    return;
  }

  if (messageType === MESSAGE_TYPE.JOIN) {
    const { peers } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.PEERS, { peers });
    peerConnectionManager.dispatchEvent(event);

    return;
  }

  if (messageType === MESSAGE_TYPE.LEAVE) {
    const { peers } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.PEERS, { peers });
    peerConnectionManager.dispatchEvent(event);

    return;
  }


  if (messageType === MESSAGE_TYPE.OFFER) {
    const { fromUUID, offer, timeStamp } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.OFFER, { uuid: fromUUID, offer, timeStamp });
    peerConnectionManager.dispatchEvent(event);

    return;
  }

  if (messageType === MESSAGE_TYPE.ANSWER) {
    const { fromUUID, answer, timeStamp } = data;

    const event = new LocalDropEvent(MESSAGE_TYPE.ANSWER, { fromUUID, answer, timeStamp });
    peerConnectionManager.dispatchEvent(event);

    return;
  }

  if (messageType === MESSAGE_TYPE.PING) {
    const message = createMessage(MESSAGE_TYPE.PONG, { message: "This is client pong!" });

    socket.send(message);

    return;
  }

  if (messageType === MESSAGE_TYPE.PONG) {
    const { message } = data;

    console.log(`[pong from server]: ${ message }`);

    return;
  }

  if (messageType === MESSAGE_TYPE.ERROR) {
    // show error!
    const errorMessage = data['message'];

    const event = new LocalDropEvent(MESSAGE_TYPE.ERROR, {
      message: errorMessage
    });
    peerConnectionManager.dispatchEvent(event);

    return;
  }
}

function addCustomMessageTypeEventListener(webSocketManager) {
  webSocketManager.addEventListener(CLIENT_EVENT_TYPE.SEND_MESSAGE, event => {
    const { message } = event;

    webSocketManager.send(message);
  });
}

function createWebSocketManager(url) {
  const webSocketManager = {
    socket: createWebSocketConnection(url),
    state: '', // not sure. maybe doesn't need
    events: {},
  };

  webSocketManager.addEventListener = (eventType, callback) => {
    webSocketManager.events[eventType] = webSocketManager.events[eventType] || [];
    webSocketManager.events[eventType].push(callback);
  }

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
  }

  webSocketManager.send = (message) => {
    webSocketManager.socket.send(message);
  }

  return webSocketManager;
}

const url = config.dev.websocketUrl;
// const url = config.production.websocketUrl;
const websocketManager = createWebSocketManager(url);
addCustomMessageTypeEventListener(websocketManager);

export default websocketManager;
