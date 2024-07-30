const { Socket } = require('socket.io');

/**
 * auth socket with jwt.
 *
 * @param {Socket} socket socket to auth
 * @param {*} next
 * @returns
 */
function authSocketToken(socket, next) {
  const token = socket.handshake.auth.token;

  if (token == null) return next(new Error('connection failed'));

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(new Error('connection failed'));
    }
    socket.user = user;
    next();
  });
}

module.exports = { authSocketToken };
