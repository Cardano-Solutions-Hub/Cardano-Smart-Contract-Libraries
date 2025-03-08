import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import initialSetup from './controllers/setup.controller.js';
import handler from './routes/handlerMap.js';
import templateCompiler from './lib/templateCompiler.js';

// create express server
const app = express();

// create http server
const server = http.createServer(app);

// create websocket server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

// define websocket event for connection
io.on('connection', async (socket) => {
  console.log('WebSocket connection established');
  try {
    const data = await initialSetup();
    console.log('Sending inital contract');
    socket.emit('initial', data);

    socket.on('codeUpdate', async (code) => {
      console.log('codeUpdate event recived');
      const handlerFunction = handler[code.contract];
      console.log('Updating code...');
      console.log('Sending updated code...');
      await handlerFunction(socket, code);
    });

    socket.on('codeSnippit', async () => {
      console.log('codeSnippit event recived');
      const contracts = [
        { contract: 'NFT', type: 'offchain' },
        { contract: 'Vesting', type: 'offchain' },
        { contract: 'Burn', type: 'offchain' },
        { contract: 'Gift', type: 'offchain' },
      ];

      const message = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < contracts.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const code = await templateCompiler(
          contracts[i].contract,
          contracts[i].type,
          {},
        );

        message.push({ contract: contracts[i].contract, code });
      }
      console.log('Sending all code snippits...');
      socket.emit('codeSnippit', message);
    });
  } catch (error) {
    console.error(error);
  }

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });
});

export default server;
