import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
    STORAGE_COLOR_THEME_KEY,
    THEME_ORKA_DARK,
} from "../constants/constant";
import { ColorThemes } from "../constants/styleTheme";
import {
    UPDATE_ORKA_THEME,
    DELETE_PEER,
    UPDATE_MY_UUID,
    UPDATE_PEER_UUID,
    ADD_FILES,
    UPDATE_PROGRESS,
    UPDATE_SELECTED_PEER,
    UPDATE_SELECTED_ROW,
    UPDATE_TABLE_USERS,
    UPDATE_TABLE_COMMENTS,
    UPDATE_SENDER_ID,
    UPDATE_TABLE_COMMENT_METADATA,
    UPDATE_TABLE_NOTIFICATIONS,
    UPDATE_TABLE_SHARING_DATA,
} from "./actionType";

function getStorageColorTheme() {
    return window.localStorage.getItem(STORAGE_COLOR_THEME_KEY);
}

function orkaTheme(
    state = ColorThemes[getStorageColorTheme() || "ThemeOrkaDark"],
    action
) {
    if (action.type === UPDATE_ORKA_THEME) {
        if (state?.name === THEME_ORKA_DARK) {
            return ColorThemes["ThemeOrkaLight"];
        } else {
            return ColorThemes["ThemeOrkaDark"];
        }
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

export default combineReducers({
    orkaTheme,
    myUUID,
    peerUUID,
    filesToTransfer,
    messageProgresses,
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
