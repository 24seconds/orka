import { peerConnectionManager } from './peerConnection';
import LocalDropEvent from './LocalDropEvent';
import {
  EventSendTextData,
  EventSendFilesData,
  EventConnectData,
  EventSendMessageData
} from './dataSchema/LocalDropEventData';
import { CLIENT_EVENT_TYPE } from '../schema';
import websocketManager from './websocket';
import store from '../redux/store';
import {
  addPeer,
  deletePeer,
  addMessage,
  updateMyUUID,
} from '../redux/action';


function sendTextToPeer(uuid, text) {
  const event = new LocalDropEvent(
    CLIENT_EVENT_TYPE.SEND_TEXT,
    new EventSendTextData({ uuid, message: text }));

  peerConnectionManager.dispatchEvent(event);
}

function sendFileToPeer(uuid, fingerprintedFile) {
  const { file, fingerprint } = fingerprintedFile

  const event = new LocalDropEvent(
    CLIENT_EVENT_TYPE.SEND_FILES,
    new EventSendFilesData({
      uuid,
      message: file.name,
      size: file.length,
      fingerprint,
    }));

  peerConnectionManager.dispatchEvent(event);
}

function sendFilesToPeer(uuid, fingerprintedFiles) {
  fingerprintedFiles.forEach((fingerprintedFile) => {
    sendFileToPeer(uuid, fingerprintedFile);
  });
}

function connectToPeer(uuid) {
  const event = new LocalDropEvent(
    CLIENT_EVENT_TYPE.CONNECT,
    new EventConnectData({ uuid }));

  peerConnectionManager.dispatchEvent(event);
}

function sendMessageToServer(message) {
  const event = new LocalDropEvent(
    CLIENT_EVENT_TYPE.SEND_MESSAGE,
    new EventSendMessageData({ message }));

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

export {
  sendTextToPeer,
  sendFilesToPeer,
  sendMessageToServer,
  connectToPeer,
  closeWebSocket,
  addJoinedPeers,
  deleteLeavedPeers,
  addMessagePacket,
  updateUUID,
  getPeerUUID,
  getMyUUID,
};
