const PORT = 5000;

const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(message);
  });
});

app.get('/', (req, res) => {
  console.log('hello world');
  res.send({ message: 'Hello world!!!' });
});

server.listen(PORT, () => {
  console.log('Server is up and running');
});
