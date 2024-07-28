const PORT = 5000;

const express = require('express');
const app = express();

const io = new Server();

app.get('/', (req, res) => {
  console.log('hello world');
  res.send({ message: 'Hello world!!!' });
});

app.listen(PORT, () => {
  console.log('Server is up and running');
});
