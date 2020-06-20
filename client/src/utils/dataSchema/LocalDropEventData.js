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


export {
  EventSendTextData,
  EventSendFilesData,
  EventConnectData,
  EventSendMessageData
}