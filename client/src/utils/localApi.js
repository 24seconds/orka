import { peerConnectionManager } from './peerConnection';
import LocalDropEvent from './LocalDropEvent';
import { CLIENT_EVENT_TYPE } from '../schema';
import websocketManager from './websocket';
import store from '../redux/store';
import { addPeer, deletePeer, addMessage } from '../redux/action';

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

export {
  sendTextToPeer,
  sendMessageToServer,
  connectToPeer,
  closeWebSocket,
  addJoinedPeers,
  deleteLeavedPeers,
  addMessagePacket,
};
