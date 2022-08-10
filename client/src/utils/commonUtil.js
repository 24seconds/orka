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

export { getSizeString, getCurrentTime, generateFingerPrint };
