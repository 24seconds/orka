import WebSocket from 'ws';

interface webSocketGroup {
  ipAddress: string;
  webSockets: {
    [peerUUID: string]: WebSocket
  }
}

export type WebSocketManager = {
  [ipAddress: string]: webSocketGroup;
};

export function isWebSocketOpen(webSocket: WebSocket) {
  return webSocket.readyState === WebSocket.OPEN;
}


const webSocketManager: WebSocketManager = {};

export default webSocketManager;
