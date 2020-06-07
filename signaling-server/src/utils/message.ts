enum MessageType {
  OFFER = 'offer',
  ANSWER = 'answer',
  PING = 'ping',
  PONG = 'pong',
  ERROR = 'error',
};

export interface Message {
  messageType: MessageType;
  data: MessageDataSchema;
};

export interface SimpleDataSchema {
  message: string;
}

export interface OfferDataSchema {
  type: string;
  sdp: string;
}

type MessageDataSchema = SimpleDataSchema | OfferDataSchema;


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

export {
  MessageType,
  createMessage,
  parseMessage,
};
