const PORT = 5000;

require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

const { authSocketToken } = require('./middleware/authSocketToken');

const users = {};

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('tiny')); // http log format

const { createServer } = require('http');
const httpServer = createServer(app);

const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.use(authSocketToken);

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`*${socket.user.name}* sent ${message}`);
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  if (users[username] != null) return res.json({ success: false });

  const user = {
    name: username,
  };
  console.log('username:', username);
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: '1h',
  });

  res.cookie('token', accessToken).json({ success: true });
  users[username] = 1;
});

httpServer.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});
