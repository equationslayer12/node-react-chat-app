const PORT = 5000;

const express = require('express');
const app = express();

const { createServer } = require('http');
const httpServer = createServer(app);

const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Annonymous user sent ${message}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
