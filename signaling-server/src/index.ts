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

  console.log('request is ', request);
  console.log('request.connection is ', request.connection);

  const ip = request.connection.remoteAddress;
  console.log('ip is ', ip);

  const ip2 = request.socket.remoteAddress;
  console.log('ip2 is ', ip2);

  const { headers, rawHeaders } = request;
  console.log('headers is ', headers);
  console.log('rawHeaders is ', rawHeaders);


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
