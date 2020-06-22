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
import { parseChunkAndHeader } from './peerMessage';
import { accumulateChunk, transferFile } from './downloadManager';

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

function transferFileToPeer(fingerprint, uuid) {
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

  transferFile(fingerprint, file, dataChannel);
}

function getMessagePacket(fingerprint) {
  // TODO: Make O(1)

  const messagePacket = store.getState().messagePackets.find((messagePacket) => {
    const { data } = messagePacket;

    return data.fingerprint === fingerprint;
  });

  return messagePacket;
}

function parsePeerChunk(chunkWithHeader) {
  return parseChunkAndHeader(chunkWithHeader);
}

async function writePeerChunk(chunkWithHeader) {
  await accumulateChunk(chunkWithHeader);
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
  transferFileToPeer,
  getMessagePacket,
  parsePeerChunk,
  writePeerChunk
};
