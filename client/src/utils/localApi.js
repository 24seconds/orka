import { peerConnectionManager } from './peerConnection';
import LocalDropEvent from './LocalDropEvent';
import { CLIENT_EVENT_TYPE } from '../schema';
import websocketManager from './websocket';

function sendTextToPeer(uuid, text) {
  const event = new LocalDropEvent(CLIENT_EVENT_TYPE.SEND_TEXT, { uuid, message: text });

  peerConnectionManager.dispatchEvent(event);
}

function connectToPeer(uuid) {
  const event = new LocalDropEvent(CLIENT_EVENT_TYPE.CONNECT, { uuid });

  peerConnectionManager.dispatchEvent(event);
}

function sendMessageToServer(message) {
  const event = new LocalDropEvent(CLIENT_EVENT_TYPE.SEND_MESSAGE, { message });

  websocketManager.dispatchEvent(event);
}

export {
  sendTextToPeer,
  sendMessageToServer,
  connectToPeer,
};
