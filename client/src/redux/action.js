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
    UPDATE_SELECTED_PEER,
    UPDATE_SELECTED_ROW,
    UPDATE_TABLE_USERS,
    UPDATE_TABLE_FILES,
    UPDATE_TABLE_LINKS,
    UPDATE_TABLE_COMMENTS,
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

export const updateSelectedPeer = (peerUUID) => ({
    type: UPDATE_SELECTED_PEER,
    payload: peerUUID,
});

export const updateSelectedRow = (rowID) => ({
    type: UPDATE_SELECTED_ROW,
    payload: rowID,
});

export const updateTableUsers = () => ({
    type: UPDATE_TABLE_USERS,
    payload: 0,
});

export const updateTableFiles = () => ({
    type: UPDATE_TABLE_FILES,
    payload: 0,
});

export const updateTableLinks = () => ({
    type: UPDATE_TABLE_LINKS,
    payload: 0,
});

export const updateTableComments = () => ({
    type: UPDATE_TABLE_COMMENTS,
    payload: 0,
});
