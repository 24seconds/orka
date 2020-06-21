import { peerConnectionManager } from './peerConnection';
import LocalDropEvent from './LocalDropEvent';
import {
  EventSendTextData,
  EventSendFilesData,
  EventDownloadFileData,
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

  console.log('sendFileToPeer, file is', file);

  const event = new LocalDropEvent(
    CLIENT_EVENT_TYPE.SEND_FILES,
    new EventSendFilesData({
      uuid,
      message: file.name,
      size: file.size,
      fingerprint,
    }));

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
      uuid, fingerprint
    }));

  peerConnectionManager.dispatchEvent(event);
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

function getFileToTransfer(fingerprint) {
  const filesToTransfer = store.getState().filesToTransfer;

  return filesToTransfer[fingerprint];
}

function transferFile(fingerprint, uuid) {
  // TODO: if duplicate download request comes, ignore or handle it

  const file = getFileToTransfer(fingerprint);

  if (!file) {
    // TODO: send error message to peer
    // TODO: handle later. Notify user that file link has expired!
  }

  if (!peerConnectionManager.peerConnections[uuid]) {
    // TODO: send error message to peer

    return;
  }

  const { dataChannel } = peerConnectionManager.peerConnections[uuid];

  const readFile = (file, offset, chunkSize, reader) => {
    if (offset > file.size) {
      dataChannel.send('done');
      return;
    }

    const chunk = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(chunk);
  }

  const reader = new FileReader();
  const chunkSize = 16000;
  let offset = 0;

  readFile(file, offset, chunkSize, reader);

  reader.addEventListener('load', (event) => {
    console.log('event.target.result is ', event.target.result);
    console.log('typeof event.target.result is ', typeof event.target.result);

    offset += chunkSize;

    // send chunk via data channel
    dataChannel.send(event.target.result);

    // read next chunk
    readFile(file, offset, chunkSize, reader);
  });
}

export {
  sendTextToPeer,
  sendFilesToPeer,
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
  transferFile
};
