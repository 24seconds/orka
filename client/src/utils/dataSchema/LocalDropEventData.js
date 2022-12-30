class EventSendUserInfo {
    constructor({ uuid }) {
        this.uuid = uuid;
    }
}

class EventResponseSharingData {
    constructor({ sharingData, uuid }) {
        this.sharingData = sharingData;
        this.uuid = uuid;
    }
}

class EventUploadLink {
    constructor({ sharingData }) {
        this.sharingData = sharingData;
    }
}

class EventUpdateUser {
    constructor({ user }) {
        this.user = user;
    }
}

class EventSendTextData {
    constructor({ uuid, message }) {
        this.uuid = uuid;
        this.message = message;
    }
}

class EventSendFilesData {
    constructor({ uuid, message, size, fingerprint }) {
        this.uuid = uuid;
        this.message = message;
        this.size = size;
        this.fingerprint = fingerprint;
    }
}

class EventDownloadFileData {
    constructor({ uuid, fingerprint }) {
        this.uuid = uuid;
        this.fingerprint = fingerprint;
    }
}

class EventConnectData {
    constructor({ uuid }) {
        this.uuid = uuid;
    }
}

class EventSendMessageData {
    constructor({ message }) {
        this.message = message;
    }
}

class EventErrorData {
    constructor({ uuid, message }) {
        this.uuid = uuid;
        this.message = message;
    }
}

export {
    EventSendUserInfo,
    EventResponseSharingData,
    EventUploadLink,
    EventUpdateUser,
    EventSendTextData,
    EventSendFilesData,
    EventDownloadFileData,
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
};
