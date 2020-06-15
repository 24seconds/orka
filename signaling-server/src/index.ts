/* eslint-disable no-console */
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import PORT from './config/constants';
import { IncomingMessage } from 'http';
import { MessageType, createMessage, parseMessage, Message, SimpleDataSchema, handleMessage } from './utils/message';
import { getRemoteIpAddress } from './utils/network';


const wsMemo: { [key: string]: any } = {};

const wss = new WebSocket.Server({
  port: PORT,
});

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  const { headers, rawHeaders } = request;

  const remoteIpAddress: string = getRemoteIpAddress(request);
  console.log('remoteIpAddress is ', remoteIpAddress);

  const room = wsMemo[remoteIpAddress] || {};
  room.sockets = room.sockets || [];
  room.sockets.push(ws);


  const testUUID = uuidv4();
  console.log('testUUID is ', testUUID);

  ws.on('message', (message: WebSocket.Data) => {
    // [15:12 Sun 07 Jun 2020] string only for now
    console.log('[Message from client] ', message as string);

    const parsedMessage = parseMessage(message as string);
    handleMessage(parsedMessage, ws);

    console.log('parsedMessage is ', parsedMessage);
  });

  const message = createMessage(MessageType.PING, { message: 'hello client!' });
  ws.send(message);
});
