import { combineReducers } from 'redux';
import {
  ADD_PEER,
  DELETE_PEER,
  ADD_MESSAGE,
} from './actionType';

const initialState = { peers: [], message: [] }

function localDropState(state = initialState, action) {
  console.log('localDropReducer is called ', state);
  console.log('action is ', action);

  if (action.type === ADD_PEER) {
    // naive implementation
    const newState = { ...state };
    const peers = action.payload;

    console.log('ADD_PEER!!!');
    newState.peers = [...newState.peers, ...peers ];
    console.log('ADD_PEER!!!, ', newState);

    return newState;
  } else if (action.type === DELETE_PEER) {
    // naive implementation
    const newState = { ...state };
    const peerSet = new Set(action.payload);

    console.log('peerSet is ', peerSet);

    const newPeers = newState.peers.filter(peer => !peerSet.has(peer));
    console.log('newPeers is ', newPeers);
    newState.peers = newPeers;

    return newState;
  } else if (action.type === ADD_MESSAGE) {
    
    const newState = { ...state };
    const message = action.payload;

    newState.message = newState.message || [];
    newState.message.push(message);

    return newState;
  }

  return state;
}

export default combineReducers({
  localDropState,
});

