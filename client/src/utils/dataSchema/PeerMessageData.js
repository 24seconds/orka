class messageTextData {
    constructor({ message, size, fingerprint }) {
        this.message = message;
        this.size = size;
        this.fingerprint = fingerprint;
    }
}

class messageFileData {
    constructor({ fingerprint, message, size }) {
        this.fingerprint = fingerprint;
        this.message = message;
        this.size = size;
    }
}

class messageDownloadData {
    constructor({ fingerprint }) {
        this.fingerprint = fingerprint;
    }
}

class messageErrorData {
    constructor({ message }) {
        this.message = message;
    }
}

export {
    messageTextData,
    messageFileData,
    messageDownloadData,
    messageErrorData,
};
