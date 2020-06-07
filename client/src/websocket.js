import config from './config';
import { MESSAGE_TYPE } from './schema';
import { createMessage, parseMessage } from './utils/message';
const socket = new WebSocket(config.dev.websocketUrl);
// const socket = new WebSocket(config.production.websocketUrl);

const SOCKET_STATE = {
  INITIAL: 1,
  CONNECTED: 2,
  CLOSED: 3,
  ERROR: 4,
};

const peerConnection = new RTCPeerConnection({
  iceServers: []
});

peerConnection.addEventListener('icecandidate', event => {
  console.log('icecandidate, event is ', event);

  if (event.candidate) {
    // Send the candidate to the remote peer
  } else {
    // All ICE candidates have been sent
  }
});

peerConnection.addEventListener('connectionstatechange', event => {
  console.log('connectionstatechange, event is ', event);
  console.log('peerConnection.connectionState is ', peerConnection.connectionState);
});

async function createOffer(peerConnection) {
  const offer = peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  return offer;
}

async function setRemoteOffer(peerConnection, offer) {
  console.log('setOffer called');
  await peerConnection.setRemoteDescription(offer);

  console.log(peerConnection);
}

async function createAnswer(peerConnection) {
  const answer = await peerConnection.createAnswer();
  console.log('createAnswer, answer is ', answer);

  await peerConnection.setLocalDescription(answer);


  return answer;
}

async function setRemoteAnswer(peerConnection, answer) {
  await peerConnection.setRemoteDescription(answer);
}

socket.addEventListener('open', async function (event) {
  {
    const message = createMessage(MESSAGE_TYPE['ping'], { message: 'ping, hello server!' })
    socket.send(message);
  }

  // send offer
  const offer = await createOffer(peerConnection);
  console.log('offer is ', offer);
  const message = createMessage(MESSAGE_TYPE['offer'], offer);
  socket.send(message);
});

socket.addEventListener('message', async function (rawMessage) {
  console.log('[Message form server], event is ', rawMessage);
  console.log('[Message from server] ', rawMessage.data);

  const message = parseMessage(rawMessage.data);

  // handle message depends on messageType
  handleMessage(message);
});

async function handleMessage(message) {
  const { messageType, data } = message;

  console.log('handleMessage, messageType is ', messageType);
  console.log('handleMessage, data is ', data);

  if (messageType === MESSAGE_TYPE['error']) {
    // show error!
    const errorMessage = data['message'];

    return;
  }

  if (messageType === MESSAGE_TYPE['offer']) {
    // set offer
    await setRemoteOffer(peerConnection, data);

    // create answer and send
    const answer = await createAnswer(peerConnection);
    const message = createMessage(MESSAGE_TYPE['answer'], answer);
    socket.send(message);

    return;
  }

  if (messageType === MESSAGE_TYPE['answer']) {
    // set answer
    await setRemoteAnswer(peerConnection, data);

    return;
  }

  if (messageType === MESSAGE_TYPE['ping']) {
    const message = createMessage(MESSAGE_TYPE['pong'], { message: "This is client pong!" });

    socket.send(message);
  }
}


export default socket;
