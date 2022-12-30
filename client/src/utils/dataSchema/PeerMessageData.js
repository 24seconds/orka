class messageUserInfoData {
    constructor({ message }) {
        this.message = message;
    }
}

class messageRequestSharingData {}

class messageResponseSharingData {
    constructor({ sharingData }) {
        this.sharingData = sharingData;
    }
}

class messageUploadLink {
    constructor({ sharingData }) {
        this.sharingData = sharingData;
    }
}

class messageUpdateUser {
    constructor({ user }) {
        this.user = user;
    }
}

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
    messageUserInfoData,
    messageRequestSharingData,
    messageResponseSharingData,
    messageUploadLink,
    messageUpdateUser,
    messageTextData,
    messageFileData,
    messageDownloadData,
    messageErrorData,
};
