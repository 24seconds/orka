const messageSchema = {
  "messageSchema": {
    "messageType": "String",
    "data": "Json String. Type is one of dataSchema"
  }
};

const dataSchema = {
  errorDataSchema: {
    "message": "string"
  },
  offerDataSchema: {
    "type": "string",
    "sdp": "string"
  },
  pingpongDataSchema: {
    "message": "string"
  }
}

export const MESSAGE_TYPE = {
  "offer": "offer",
  "answer": "answer",
  "ping": "ping",
  "pong": "pong",
  "error": "error",
};

