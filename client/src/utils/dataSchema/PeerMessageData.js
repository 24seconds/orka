class messageTextData {
  constructor({ message }) {
    this.message = message;
  }
}

class messageFileData {
  constructor({ fingerprint, message, size }) {
    this.fingerprint = fingerprint;
    this.message = message;
    this.size = size;
  }
}


export {
  messageTextData,
  messageFileData,
}
