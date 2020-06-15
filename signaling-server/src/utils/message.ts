import WebSocket from 'ws';

enum MessageType {
  UUID = 'UUID',
  PEERS = 'PEERS',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  OFFER = 'OFFER',
  ANSWER = 'ANSWER',
  PING = 'PING',
  PONG = 'PONG',
  ERROR = 'ERROR',
};

export interface Message {
  messageType: MessageType;
  data: MessageDataSchema;
}

interface SimpleDataSchema {
  message: string;
}

interface OfferDataSchema {
  fromUUID: string;
  toUUID: string;
  timeStamp?: string | null;
  offer: {
    type: string;
    sdp: string;
  }
}

interface AnswerDataSchema {
  fromUUID: string;
  toUUID: string;
  timeStamp?: string | null;
  answer: {
    type: string;
    sdp: string;
  }
}

interface UUIDDataSchema {
  uuid: string;
}

interface PeersJoinLeaveDataSchema {
  peers: Array<string>;
}

type MessageDataSchema =
  SimpleDataSchema | OfferDataSchema | AnswerDataSchema | UUIDDataSchema | PeersJoinLeaveDataSchema;


function createMessage(messageType: MessageType, data: MessageDataSchema): string {
  const message = {
    messageType,
    data,
  };

  return JSON.stringify(message);
}

function parseMessage(rawMessage: string): Message {
  try {
    const message: Message = JSON.parse(rawMessage);

    if (!Object.values(MessageType).includes(message.messageType)) {
      throw new Error(`This messageType is not supported! type: ${message.messageType}`);
    }

    return message;
  } catch (err) {
    return {
      messageType: MessageType.ERROR,
      data: {
        message: err.message,
      },
    };
  }
}

function handleMessage(parsedMessage: Message, ws: WebSocket) {
  const { messageType, data } = parsedMessage;

  if (messageType === MessageType.PING) {
    const message = createMessage(MessageType.PONG, { message: 'pong from server!' });
    ws.send(message);

    return;
  }

  if (messageType === MessageType.PONG) {
    console.log('[Pong from client] ', (data as SimpleDataSchema).message);
  }
}

export {
  MessageType,
  createMessage,
  parseMessage,
  handleMessage,
};
