import { PEER_MESSAGE_TYPE } from '../schema';

function generateFingerPrint() {
  const arr = new Uint8Array(10);
  crypto.getRandomValues(arr);
  
  const stringArr = Array.from(arr, x => ('0' + x.toString(16)).substr(-2));

  return 'localdrop-file-'+ stringArr.join('');
}

function getCurrentTime() {
  const now = new Date();

  const hours = `0${ now.getHours() }`.slice(-2);
  const minutes = `0${ now.getMinutes() }`.slice(-2);
  const seconds = `0${ now.getSeconds() }`.slice(-2);

  return `${ hours }:${ minutes }:${ seconds }`;
}

function createMessagePacket({
  source, destination, messageType, data,
}) {
  if (messageType === PEER_MESSAGE_TYPE.TEXT) {

    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 100
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.FILE) {
    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 0
    }
  }

  if (messageType === PEER_MESSAGE_TYPE.ERROR) {
    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 100
    }
  }
}

export {
  createMessagePacket,
  generateFingerPrint,
}