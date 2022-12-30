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

class messageUploadSharingData {
    constructor({ sharingData }) {
        this.sharingData = sharingData;
    }
}

class messageUpdateUser {
    constructor({ user }) {
        this.user = user;
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
    messageUploadSharingData,
    messageUpdateUser,
    messageDownloadData,
    messageErrorData,
};
