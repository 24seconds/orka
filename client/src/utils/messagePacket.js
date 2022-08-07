import { PEER_MESSAGE_TYPE } from "../schema";
import { getCurrentTime } from "./commonUtil";

function createMessagePacket({ source, destination, messageType, data }) {
  if (messageType === PEER_MESSAGE_TYPE.TEXT) {
    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 100,
    };
  }

  if (messageType === PEER_MESSAGE_TYPE.FILE) {
    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 0,
    };
  }

  if (messageType === PEER_MESSAGE_TYPE.ERROR) {
    return {
      source,
      destination,
      type: messageType,
      data,
      time: getCurrentTime(),
      progress: 100,
    };
  }
}

export { createMessagePacket };
