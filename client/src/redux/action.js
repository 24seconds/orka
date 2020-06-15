import {
  ADD_PEER,
  DELETE_PEER,
  ADD_MESSAGE,
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



