/* eslint-disable no-console */
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage } from 'http';
import PORT from './config/constants';
import { MessageType, createMessage, parseMessage, Message, handleMessage } from './utils/message';
import { getRemoteIpAddress } from './utils/network';
import webSocketManager from './utils/webSocketManager';

const wss = new WebSocket.Server({
  port: PORT,
});

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  const remoteIpAddress: string = getRemoteIpAddress(request);
  console.log('remoteIpAddress is ', remoteIpAddress);

  const peerUUID = uuidv4();
  webSocketManager[remoteIpAddress] = webSocketManager[remoteIpAddress] || {};
  webSocketManager[remoteIpAddress].webSockets = webSocketManager[remoteIpAddress].webSockets || {};
  webSocketManager[remoteIpAddress].webSockets[peerUUID] = ws;

  console.log(`[WS_EVENT]-[${peerUUID}]: joined!`);

  ws.on('message', (message: WebSocket.Data) => {
    console.log('[Message from client] ', message as string);

    const parsedMessage = parseMessage(message as string);
    handleMessage(parsedMessage, ws, webSocketManager, remoteIpAddress);

    console.log('parsedMessage is ', parsedMessage);
  });

  ws.on('error', (error: Error) => {
    console.log(`[WS_EVENT]-[${peerUUID}]: error is `, error);
  });

  ws.on('close', (code: number, reason: string) => {
    console.log(`[WS_EVENT]-[${peerUUID}]: close, code  is `, code, ', reason is ', reason);

    // remove
    if (webSocketManager[remoteIpAddress].webSockets[peerUUID]) {
      delete webSocketManager[remoteIpAddress].webSockets[peerUUID];
    }

    // TODO: send LEAVE messages with more details
    Object.values(webSocketManager[remoteIpAddress].webSockets).forEach((otherWebSocket) => {
      const leaveMessage = createMessage(MessageType.LEAVE, { peers: [peerUUID] });

      otherWebSocket.send(leaveMessage);
    });
  });

  // send back to peer with uuid
  const message = createMessage(MessageType.UUID, { uuid: peerUUID });
  ws.send(message);

  // notify other peers that peer is joined
  Object.entries(webSocketManager[remoteIpAddress].webSockets).forEach(([uuid, otherWebSocket]) => {
    console.log('hahahah');
    const peerJoinMessage = createMessage(MessageType.JOIN, { peers: [peerUUID] });

    console.log(`[${uuid}]: readyState is `, otherWebSocket.readyState);
    if (otherWebSocket.readyState === WebSocket.CLOSED
      || otherWebSocket.readyState === WebSocket.CLOSING) {

      // remove
      if (webSocketManager[remoteIpAddress].webSockets[uuid]) {
        delete webSocketManager[remoteIpAddress].webSockets[uuid];
      }

      return;
    }

    otherWebSocket.send(peerJoinMessage, (err?: Error) => {
      if (err && err.message.includes('CLOSED')) {

        // remove
        if (webSocketManager[remoteIpAddress].webSockets[uuid]) {
          delete webSocketManager[remoteIpAddress].webSockets[uuid];

          // TODO: send LEAVE messages with more details
          Object.values(webSocketManager[remoteIpAddress].webSockets).forEach((otherWs) => {
            const leaveMessage = createMessage(MessageType.LEAVE, { peers: [peerUUID] });

            otherWs.send(leaveMessage);
          });
        }
      }

      console.log(`[${uuid}]: peerJoinMessage sent`, err);
    });
  });
});
