import { PEER_MESSAGE_TYPE } from '../schema';

function generateFingerPrint() {
  const arr = new Uint8Array(10);
  crypto.getRandomValues(arr);
  
  const stringArr = Array.from(arr, x => ('0' + x.toString(16)).substr(-2));

  return 'localdrop-file-'+ stringArr.join('');
}

function createMessagePacket({
  source, destination, messageType, content,
}) {
  if (messageType === PEER_MESSAGE_TYPE.TEXT) {
    return {
      source,
      destination,
      type: messageType,
      data: {
        message: content
      },
      size: content.length
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.FILE) {
    const { name, size, type } = content;

    return {
      source,
      destination,
      type: messageType,
      data: {
        message: name,
        fingerprint: generateFingerPrint(),
      },
      size,
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.ERROR) {
    return {
      source,
      destination,
      type: messageType,
      data: {
        message: content
      }
    }
  }
}

export {
  createMessagePacket,
  generateFingerPrint,
}