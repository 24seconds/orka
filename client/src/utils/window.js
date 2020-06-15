import { closeWebSocket } from './localApi';

window.addEventListener('beforeunload', (event) => {
  console.log('beforeunload');
  closeWebSocket();
});
