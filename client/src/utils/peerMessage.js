import { PEER_MESSAGE_TYPE } from '../schema';
import {
  FINGERPRINT_SIZE,
  TOTAL_NUMBER_SIZE,
  CHUNK_NUMBER_SIZE,
  HEADER_SIZE_IN_BYTES,
} from '../constants/constant';

function createPeerMessage(messageType, data) {
  const message = {
    messageType,
    data,
  };

  return JSON.stringify(message);
}

function parsePeerMessage(rawMessage) {
  console.log('rawPeerMessage is ', rawMessage);
  const parsedMessage = ((rawMessage) => {
    try {
      const message = JSON.parse(rawMessage);

      if (!(message['messageType'] in PEER_MESSAGE_TYPE)) {
        throw new Error(`This peerMessageType is not supported! type: ${message['messageType']}`)
      }

      return message;
    } catch(err) {
      return {
        messageType: PEER_MESSAGE_TYPE.ERROR,
        data: {
          "message": err.message
        }
      }
    }
  })(rawMessage);

  return parsedMessage;
}

async function concatHeaderAndChunk(chunkNumber, totalNumber, fingerprint, chunk) {
  const headerFingerprint = new TextEncoder("utf-8").encode(fingerprint);

  const headerChunkNumber = numToUint32(chunkNumber);
  const headerTotalNumber = numToUint32(totalNumber);

  console.log('sender: fingerprint is ', fingerprint);
  console.log('headerFingerprint is ', headerFingerprint);
  console.log('headerChunkNumber is ', headerChunkNumber);
  console.log('headerTotalNumber is ', headerTotalNumber);

  const header = await (new Blob([
    headerFingerprint.buffer,
    headerChunkNumber,
    headerTotalNumber,
  ])).arrayBuffer();

  const chunkWithHeader = await (new Blob([header, chunk])).arrayBuffer();

  return chunkWithHeader;
}

function numToUint32(num) {
  const arr = new ArrayBuffer(4);
  const view = new DataView(arr);
  view.setUint32(0, num, false);
  return arr;
}

function parseChunkAndHeader(chunkWithHeader) {
  const uInt8Array = new Uint8Array(chunkWithHeader);
  const fingerprint = new TextDecoder().decode(uInt8Array.slice(0, FINGERPRINT_SIZE));

  const chunkNumber =
    new DataView(uInt8Array.slice(
      FINGERPRINT_SIZE,
      FINGERPRINT_SIZE + CHUNK_NUMBER_SIZE).buffer).getUint32(0);

  const totalNumber =
    new DataView(uInt8Array.slice(
      FINGERPRINT_SIZE + CHUNK_NUMBER_SIZE,
      FINGERPRINT_SIZE + CHUNK_NUMBER_SIZE + TOTAL_NUMBER_SIZE
    ).buffer).getUint32(0);

  const chunk =
    uInt8Array.slice(HEADER_SIZE_IN_BYTES, uInt8Array.byteLength).buffer;

  console.log('receiver: fingerprint is ', fingerprint);
  console.log('receiver: totalNumber is ', totalNumber);
  console.log('receiver: chunkNumber is ', chunkNumber);

  return {
    fingerprint,
    chunkNumber,
    totalNumber,
    chunk
  }
}


export {
  createPeerMessage,
  parsePeerMessage,
  concatHeaderAndChunk,
  parseChunkAndHeader
}