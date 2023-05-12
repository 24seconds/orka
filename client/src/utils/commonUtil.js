import isURL from "validator/lib/isURL";

import {
    ACTIVITY_ROW_FILTER_FILE,
    ACTIVITY_ROW_FILTER_LINK,
    ACTIVITY_ROW_FILTER_TEXT,
    DATATYPE_FILE,
    DATATYPE_LINK,
    DATATYPE_TEXT,
    DATA_EXTENSION_GENERAL,
    PROFILE_IMAGE_COUNT,
    RANDOM_ADJECTIVE,
    RANDOM_NAMES,
} from "../constants/constant";

function getSizeString(size) {
    if (size >= 1000 && size < 1000 * 1000) {
        return `${(size / 1000).toFixed(1)} KB`;
    }

    if (size >= 1000 * 1000 && size < 1000 * 1000 * 1000) {
        return `${(size / (1000 * 1000)).toFixed(1)} MB`;
    }

    if (size >= 1000 * 1000 * 1000) {
        return `${(size / (1000 * 1000 * 1000)).toFixed(1)} GB`;
    }
}

function getCurrentTime() {
    const now = new Date();

    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);
    const seconds = `0${now.getSeconds()}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
}

function generateFingerPrint() {
    const arr = new Uint8Array(10);
    crypto.getRandomValues(arr);

    const stringArr = Array.from(arr, (x) => ("0" + x.toString(16)).substr(-2));

    return "localdrop-file-" + stringArr.join("");
}

function filterSharingData(data, activeFilter, rowsToBeDeleted) {
    console.log("filterSharingData:", data, activeFilter, rowsToBeDeleted);
    return data.filter((d) => {
        if (d.id in rowsToBeDeleted) {
            return false;
        }

        if (activeFilter === ACTIVITY_ROW_FILTER_FILE) {
            return d.dataType === DATATYPE_FILE;
        }
        if (activeFilter === ACTIVITY_ROW_FILTER_LINK) {
            return d.dataType === DATATYPE_LINK;
        }
        if (activeFilter === ACTIVITY_ROW_FILTER_TEXT) {
            return d.dataType === DATATYPE_TEXT;
        }

        return true;
    });
}

function convertTimestampReadable(timestamp, now) {
    if (timestamp > now) {
        return `future`;
    }

    // time in second.
    const timeDiff = Math.round((now - timestamp) / 1000);

    const timeInMinute = Math.round(timeDiff / 60);
    const timeInHour = Math.round(timeDiff / 60 / 60);
    const timeInDay = Math.round(timeDiff / 60 / 60 / 24);

    if (timeInMinute < 60) {
        return `${timeInMinute}m ago`;
    }

    if (timeInHour < 24) {
        return `${timeInHour}H ago`;
    }

    return `${timeInDay}d ago`;
}

function generateSharingDataUUID() {
    return `sd-${crypto.randomUUID()}`;
}

// generateUserProfile generates my user profile
function generateUserProfile() {
    // TODO(young): use local storage as cache later
    const profile = getRandomNumber(PROFILE_IMAGE_COUNT);
    const name = `${
        RANDOM_ADJECTIVE[getRandomNumber(RANDOM_ADJECTIVE.length)]
    } ${RANDOM_NAMES[profile]}`;

    return { name, profile };
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// inferFileExtension tries to infer the file extension.
// if it failed to infer, it returns "GENERAL"
function inferFileExtension(mimeType, name) {
    const subType = getSubtypeOfMIMEtype(mimeType);

    if (subType !== null) {
        return subType;
    }

    return getFileExtenstion(name);
}

// ex) input "image/png" -> output "png",
// input "image/png;param=hoho" -> output "png"
function getSubtypeOfMIMEtype(type) {
    const regex = /(.*){1}\/([^;]*){1}(;.*)*/;
    const matched = type.match(regex);

    if (matched && matched.length >= 3) {
        return matched[2];
    }

    return null;
}

// ex) input "orka.har" -> output "har"
// fallback type is DATA_EXTENSION_GENERAL
function getFileExtenstion(name) {
    const arr = name.split(".");
    if (arr.length === 1) {
        return DATA_EXTENSION_GENERAL;
    }
    return arr.pop();
}

// inferDataTypeOfText infers data type of text.
// if it failed to infer, fallback to DATATYPE_TEXT
function inferDataTypeOfText(text) {
    if (isURL(text)) {
        return DATATYPE_LINK;
    }

    return DATATYPE_TEXT;
}

function getProfilePath(profile) {
    return `profile_${RANDOM_NAMES[profile].toLowerCase()}.png`;
}

export {
    getSizeString,
    getCurrentTime,
    generateFingerPrint,
    filterSharingData,
    convertTimestampReadable,
    generateUserProfile,
    generateSharingDataUUID,
    inferFileExtension,
    inferDataTypeOfText,
    getProfilePath,
};
