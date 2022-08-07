import {
  ADD_PEER,
  DELETE_PEER,
  ADD_MESSAGE,
  UPDATE_MY_UUID,
  UPDATE_PEER_UUID,
  ADD_FILES,
  DELETE_FILES,
  UPDATE_PROGRESS,
  UPDATE_IS_SYSTEM_MESSAGE_SELECTED,
  ADD_SYSTEM_MESSAGE,
} from "./actionType";

export const addPeer = (peerList) => ({
  type: ADD_PEER,
  payload: peerList,
});

export const deletePeer = (peerList) => ({
  type: DELETE_PEER,
  payload: peerList,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const updateMyUUID = (uuid) => ({
  type: UPDATE_MY_UUID,
  payload: uuid,
});

export const updatePeerUUID = (uuid) => ({
  type: UPDATE_PEER_UUID,
  payload: uuid,
});

export const addFiles = (fingerprintedFiles) => ({
  type: ADD_FILES,
  payload: fingerprintedFiles,
});

export const deleteFiles = (files) => ({
  type: DELETE_FILES,
  payload: files,
});

export const updateProgress = (fingerprint, progress) => ({
  type: UPDATE_PROGRESS,
  payload: { fingerprint, progress },
});

export const updateIsSystemMessageTabSelected = () => ({
  type: UPDATE_IS_SYSTEM_MESSAGE_SELECTED,
});

export const addSystemMessage = (systemMessage) => ({
  type: ADD_SYSTEM_MESSAGE,
  payload: systemMessage,
});
