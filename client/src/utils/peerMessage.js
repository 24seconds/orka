import { PEER_MESSAGE_TYPE } from '../schema';

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

export {
  createPeerMessage,
  parsePeerMessage,
}