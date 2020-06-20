import { PEER_MESSAGE_TYPE } from '../schema';

function generateFingerPrint() {
  const arr = new Uint8Array(10);
  crypto.getRandomValues(arr);
  
  const stringArr = Array.from(arr, x => ('0' + x.toString(16)).substr(-2));

  return 'localdrop-file-'+ stringArr.join('');
}

function createMessagePacket({
  source, destination, messageType, data, size,
}) {
  if (messageType === PEER_MESSAGE_TYPE.TEXT) {
    const { message } = data;

    return {
      source,
      destination,
      type: messageType,
      data,
      size: message.length
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.FILE) {
    return {
      source,
      destination,
      type: messageType,
      data,
      size,
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.ERROR) {
    return {
      source,
      destination,
      type: messageType,
      data,
    }
  }
}

export {
  createMessagePacket,
  generateFingerPrint,
}