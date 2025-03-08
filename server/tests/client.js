import { io } from 'socket.io-client';

console.log('Trying to connect to WebSocket server');

// Connect to the WebSocket server
const socket = io('ws://100.67.47.42:5006?EIO=4&transport=websocket');

// Listen for connection
socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Emit the codeUpdate event with a JSON value
  const data = {
    contract: 'NFT',
    type: 'onchain',
    tokenname: 'naod',
    scriptName: 'script',
  };

  socket.emit('codeUpdate', JSON.stringify(data));

  // Listen for server response (optional)
  socket.on('initial', (code) => {
    console.log('Initial smart contract:', code);
  });

  // socket.emit('codeUpdate', data);

  // listen for code update
  socket.on('codeUpdate', (code) => {
    console.log('modified smart contract:', code);
  });
});
