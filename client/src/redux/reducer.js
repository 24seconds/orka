import { combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import {
    STORAGE_COLOR_THEME_KEY,
    THEME_ORKA_DARK,
    TOAST_HIDE_STRATEGY_SRHINK,
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
    UPDATE_SENDER_ID,
    UPDATE_TABLE_NOTIFICATIONS,
    UPDATE_TABLE_SHARING_DATA,
    ADD_TOAST_MESSAGE,
    DELETE_TOAST_MESSAGE,
    TOGGLE_MODAL_STATE,
    UPDATE_IS_MOBILE_WIDTH,
} from "./actionType";

function getStorageColorTheme() {
    return window.localStorage.getItem(STORAGE_COLOR_THEME_KEY);
}

function setStoargeColorTheme(theme) {
    return window.localStorage.setItem(STORAGE_COLOR_THEME_KEY, theme);
}

function orkaTheme(
    state = ColorThemes[getStorageColorTheme() || "ThemeOrkaDark"],
    action
) {
    if (action.type === UPDATE_ORKA_THEME) {
        if (state?.name === THEME_ORKA_DARK) {
            setStoargeColorTheme("ThemeOrkaLight");
            return ColorThemes["ThemeOrkaLight"];
        } else {
            setStoargeColorTheme("ThemeOrkaDark");
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

function toastMessages(state = [], action) {
    if (action.type === ADD_TOAST_MESSAGE) {
        const tempState = state.map((s) => {
            s.hideStrategy = TOAST_HIDE_STRATEGY_SRHINK;
            return s;
        });

        const newState = [...tempState, action.payload];
        newState.forEach((s) => {
            console.log("newState:", s.id, s.hideStrategy);
        });

        return newState;
    }

    if (action.type === DELETE_TOAST_MESSAGE) {
        console.log("reducer, action payload:", action.payload);
        return state.filter((message) => message.id !== action.payload);
    }

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

function tableNotifications(state = 0, action) {
    if (action.type === UPDATE_TABLE_NOTIFICATIONS) {
        const newState = state + 1;

        return newState;
    }

    return state;
}

function uploadModalOpen(state = false, action) {
    if (action.type === TOGGLE_MODAL_STATE) {
        return !state;
    }

    return state;
}

function isMobileWidth(state = false, action) {
    if (action.type === UPDATE_IS_MOBILE_WIDTH) {
        return action.payload;
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
    toastMessages,
    tableUsers,
    tableSharingData,
    tableNotifications,
    uploadModalOpen,
    isMobileWidth,
});
