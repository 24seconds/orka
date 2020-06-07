/* eslint-disable no-console */
import WebSocket from 'ws';
import PORT from './config/constants';
import { IncomingMessage } from 'http';
import { MessageType, createMessage, parseMessage, Message, SimpleDataSchema } from './utils/message';
import fs from 'fs';

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

const wss = new WebSocket.Server({
  port: PORT,
});

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  // console.log('connection, ws is ', ws);
  console.log('connection, ws is ', ws);
  // console.log('connection, request is ', request.headers.connection);

  // fs.writeFileSync('./server.log', JSON.stringify(ws));

  const ip  =  request.connection.remoteAddress;
  console.log('ip is ', ip);

  ws.on('message', (message: WebSocket.Dat[a) => {
    // [15:12 Sun 07 Jun 2020] string only for now
    console.log('[Message from client] ', message as string);

    const parsedMessage = parseMessage(message);
    handleMessage(parsedMessage, ws);

    console.log('parsedMessage is ', parsedMessage);
  });

  const message = createMessage(MessageType.PING, { message: 'hello client!' });
  ws.send(message);
});
