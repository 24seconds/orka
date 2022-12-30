import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
    ADD_PEER,
    DELETE_PEER,
    UPDATE_MY_UUID,
    UPDATE_PEER_UUID,
    ADD_FILES,
    UPDATE_PROGRESS,
    UPDATE_IS_SYSTEM_MESSAGE_SELECTED,
    ADD_SYSTEM_MESSAGE,
    UPDATE_SELECTED_PEER,
    UPDATE_SELECTED_ROW,
    UPDATE_TABLE_USERS,
    UPDATE_TABLE_COMMENTS,
    UPDATE_SENDER_ID,
    UPDATE_TABLE_COMMENT_METADATA,
    UPDATE_TABLE_NOTIFICATIONS,
    UPDATE_TABLE_SHARING_DATA,
} from "./actionType";
import { generateFingerPrint, getCurrentTime } from "../utils/commonUtil";
import { ORKA_APP_VERSION } from "../constants/constant";

const initialState = { peers: [], message: [] };

function localDropState(state = initialState, action) {
    console.log("localDropReducer is called ", state);
    console.log("action is ", action);

    if (action.type === ADD_PEER) {
        // naive implementation
        const newState = { ...state };
        const peers = action.payload;

        console.log("ADD_PEER!!!");
        newState.peers = [...newState.peers, ...peers];
        console.log("ADD_PEER!!!, ", newState);

        return newState;
    } else if (action.type === DELETE_PEER) {
        // naive implementation
        const newState = { ...state };
        const peerSet = new Set(action.payload);

        console.log("peerSet is ", peerSet);

        const newPeers = newState.peers.filter((peer) => !peerSet.has(peer));
        console.log("newPeers is ", newPeers);
        newState.peers = newPeers;

        return newState;
    }

    return state;
}

function messageProgresses(state = {}, action) {
    if (action.type === UPDATE_PROGRESS) {
        const newState = { ...state };
        const { fingerprint, progress } = action.payload;

        if (newState[fingerprint]) {
            newState[fingerprint] = progress;
        }

        return newState;
    }

    return state;
}

function myUUID(state = null, action) {
    if (action.type === UPDATE_MY_UUID) {
        const newState = action.payload;

        return newState;
    }

    return state;
}

function peerUUID(state = null, action) {
    if (action.type === UPDATE_PEER_UUID) {
        const newState = action.payload;

        return newState;
    }

    if (action.type === DELETE_PEER) {
        const peers = action.payload;

        if (peers.indexOf(state) !== -1) {
            return null;
        }
    }

    return state;
}

function filesToTransfer(state = {}, action) {
    if (action.type === ADD_FILES) {
        const fingerprintedFiles = action.payload;

        const newState = { ...state };

        fingerprintedFiles.forEach((fingerprintedFile) => {
            const { file, fingerprint } = fingerprintedFile;

            newState[fingerprint] = file;
        });

        return newState;
    }

    return state;
}

function systemMessageMetaData(
    state = { isSelected: false, isRead: true },
    action
) {
    if (action.type === UPDATE_IS_SYSTEM_MESSAGE_SELECTED) {
        const newState = { ...state };

        newState.isSelected = !newState.isSelected;
        newState.isRead = newState.isSelected ? true : newState.isRead;

        return newState;
    }

    if (action.type === ADD_SYSTEM_MESSAGE) {
        const newState = { ...state };
        newState.isRead = newState.isSelected ? true : false;

        return newState;
    }

    return state;
}

function selectedPeer(state = null, action) {
    if (action.type === UPDATE_SELECTED_PEER) {
        const newState = action.payload;

        return newState;
    }

    return state;
}

function selectedRow(state = null, action) {
    if (action.type === UPDATE_SELECTED_ROW) {
        const newState = action.payload;

        return newState;
    }

    return state;
}

function selectedSender(state = null, action) {
    if (action.type === UPDATE_SENDER_ID) {
        const newState = action.payload;

        return newState;
    }

    return state;
}

// TODO(young): use `uuidv4()`
function myOrkaUUID(state = "naive-id-2", action) {
    return state;
}

function tableUsers(state = 0, action) {
    if (action.type === UPDATE_TABLE_USERS) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

function tableSharingData(state = 0, action) {
    if (action.type === UPDATE_TABLE_SHARING_DATA) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

function tableComments(state = 0, action) {
    if (action.type === UPDATE_TABLE_COMMENTS) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

function tableCommentMetadata(state = 0, action) {
    if (action.type === UPDATE_TABLE_COMMENT_METADATA) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

function tableNotifications(state = 0, action) {
    if (action.type === UPDATE_TABLE_NOTIFICATIONS) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

const defaultSystemMessage = {
    message: `App version: ${ORKA_APP_VERSION}\n\nHi, This is the first system message!`,
    fingerprint: generateFingerPrint(),
    createdAt: getCurrentTime(),
};

function systemMessages(state = [defaultSystemMessage], action) {
    if (action.type === ADD_SYSTEM_MESSAGE) {
        const systemMessage = action.payload;
        const newState = [systemMessage, ...state];

        return newState;
    }

    return state;
}

export default combineReducers({
    localDropState,
    myUUID,
    peerUUID,
    filesToTransfer,
    messageProgresses,
    systemMessageMetaData,
    systemMessages,
    selectedPeer,
    selectedRow,
    selectedSender,
    tableUsers,
    tableSharingData,
    tableComments,
    tableCommentMetadata,
    tableNotifications,
    myOrkaUUID,
});
