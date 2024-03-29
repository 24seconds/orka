import {
    ADD_PEER,
    DELETE_PEER,
    UPDATE_MY_UUID,
    UPDATE_PEER_UUID,
    ADD_FILES,
    DELETE_FILES,
    UPDATE_PROGRESS,
    UPDATE_SELECTED_PEER,
    UPDATE_SELECTED_ROW,
    UPDATE_TABLE_USERS,
    UPDATE_TABLE_SHARING_DATA,
    UPDATE_SENDER_ID,
    UPDATE_TABLE_NOTIFICATIONS,
    UPDATE_ORKA_THEME,
    ADD_TOAST_MESSAGE,
    DELETE_TOAST_MESSAGE,
    TOGGLE_MODAL_STATE,
    UPDATE_IS_MOBILE_WIDTH,
    INCREASE_PROFILE_EDIT_EVENT_COUNTER,
    TOGGLE_GUIDE_STATE,
} from "./actionType";

export const updateOrkaTheme = () => ({
    type: UPDATE_ORKA_THEME,
    payload: null,
});

export const addPeer = (peerList) => ({
    type: ADD_PEER,
    payload: peerList,
});

export const deletePeer = (peerList) => ({
    type: DELETE_PEER,
    payload: peerList,
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

export const updateSelectedPeer = (peerUUID) => ({
    type: UPDATE_SELECTED_PEER,
    payload: peerUUID,
});

export const updateSelectedRow = (rowID) => ({
    type: UPDATE_SELECTED_ROW,
    payload: rowID,
});

export const updateSenderID = (senderID) => ({
    type: UPDATE_SENDER_ID,
    payload: senderID,
});

export const updateTableUsers = () => ({
    type: UPDATE_TABLE_USERS,
    payload: 0,
});

export const updateTableSharingData = () => ({
    type: UPDATE_TABLE_SHARING_DATA,
    payload: 0,
});

export const updateTableNotifications = () => ({
    type: UPDATE_TABLE_NOTIFICATIONS,
    payload: 0,
});

export const addToastMessage = (message) => ({
    type: ADD_TOAST_MESSAGE,
    payload: message,
});

export const deleteToastMessage = (id) => ({
    type: DELETE_TOAST_MESSAGE,
    payload: id,
});

export const toggleModalState = (state) => ({
    type: TOGGLE_MODAL_STATE,
    payload: !state,
});

export const toggleGuideState = (state) => ({
    type: TOGGLE_GUIDE_STATE,
    payload: !state,
});

export const updateIsMobileWidth = (state) => ({
    type: UPDATE_IS_MOBILE_WIDTH,
    payload: state,
});

export const triggerProfileEditNameEvent = () => ({
    type: INCREASE_PROFILE_EDIT_EVENT_COUNTER,
});
