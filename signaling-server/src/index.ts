/* eslint-disable no-console */
import express from 'express';
import WebSocket from 'ws';
import PORT from './config/constants';


const wss = new WebSocket.Server({
  port: 4000,
});

wss.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: WebSocket.Data) => {
    console.log('received: %s', message);
  });

  ws.send('Hello Client!');
});


const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.get('/', (req : express.Request, res : express.Response) => {
  res.send('pong');
});
