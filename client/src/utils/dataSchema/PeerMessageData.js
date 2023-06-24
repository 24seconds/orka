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

class messageDeleteSharingData {
    constructor({ id }) {
        this.id = id;
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
    messageDeleteSharingData,
    messageUpdateUser,
    messageDownloadData,
    messageErrorData,
};
