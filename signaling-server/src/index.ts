/* eslint-disable no-console */
import WebSocket from 'ws';
import PORT from './config/constants';
import { IncomingMessage } from 'http';


const wss = new WebSocket.Server({
  port: PORT,
});

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
  console.log('connection, ws is ', ws);
  // console.log('connection, request is ', request.headers.connection);

  ws.on('message', (message: WebSocket.Data) => {
    console.log('received: %s', message);
  });

  ws.send('Hello Client!');
});

