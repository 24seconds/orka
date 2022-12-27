import {
    DATATYPE_FILE,
    DATATYPE_LINK,
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

function filterSharingData(data, option, rowsToBeDeleted) {
    console.log("filterSharingData:", data, rowsToBeDeleted);
    return data.filter((d) => {
        if (d.id in rowsToBeDeleted) {
            return false;
        }

        if (option === "Files") {
            return d.dataType === DATATYPE_FILE;
        }
        if (option === "URLs") {
            return d.dataType === DATATYPE_LINK;
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
    const name = `${
        RANDOM_ADJECTIVE[getRandomNumber(RANDOM_ADJECTIVE.length)]
    } ${RANDOM_NAMES[getRandomNumber(RANDOM_NAMES.length)]}`;
    const profile = getRandomNumber(PROFILE_IMAGE_COUNT);
    return { name, profile };
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// ex) "image/png", "image/png;param=hoho"
function getSubtypeOfMIMEtypes(types) {
    const regex = /(.*){1}\/([^;]*){1}(;.*)*/;
    const matched = types.match(regex);

    if (matched.length >= 3) {
        return matched[2];
    }

    return null;
}

export {
    getSizeString,
    getCurrentTime,
    generateFingerPrint,
    filterSharingData,
    convertTimestampReadable,
    generateUserProfile,
    generateSharingDataUUID,
    getSubtypeOfMIMEtypes,
};
