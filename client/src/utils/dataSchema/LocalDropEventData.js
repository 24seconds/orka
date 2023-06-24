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

class EventDeleteSharingData {
    constructor({ id }) {
        this.id = id;
    }
}

class EventUpdateUser {
    constructor({ user }) {
        this.user = user;
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
    EventDeleteSharingData,
    EventUpdateUser,
    EventDownloadFileData,
    EventConnectData,
    EventSendMessageData,
    EventErrorData,
};
