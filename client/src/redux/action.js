import {
  ADD_PEER,
  DELETE_PEER,
  ADD_MESSAGE,
  UPDATE_MY_UUID,
  UPDATE_PEER_UUID,
  ADD_FILES,
  DELETE_FILES,
} from './actionType';

export const addPeer = peerList => ({
  type: ADD_PEER,
  payload: peerList,
});

export const deletePeer = peerList => ({
  type: DELETE_PEER,
  payload: peerList,
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const updateMyUUID = uuid => ({
  type: UPDATE_MY_UUID,
  payload: uuid,
});

export const updatePeerUUID = uuid => ({
  type: UPDATE_PEER_UUID,
  payload: uuid,
})

export const addFiles = files => ({
  type: ADD_FILES,
  payload: files
});

export const deleteFiles = files => ({
  type: DELETE_FILES,
  payload: files
});
