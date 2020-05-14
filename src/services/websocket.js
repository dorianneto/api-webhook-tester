const io = require('socket.io');

let websocket;
const connections = [];

exports.setUpWebsocket = (server, serverOptions) => {
  websocket = io(server, serverOptions);

  websocket.on('connection', socket => {
    const { token } = socket.handshake.query;

    connections.push({
      id: socket.id,
      token,
    });

    console.log('Connecteds:');
    console.log(connections);

    socket.on('disconnect', reason => {
      const oldConnection = connections.indexOf(connections.filter(value => value.id === socket.id)[0])
      connections.splice(oldConnection, 1);

      console.log(`client ${socket.id} disconnected!`);
    });
  });
}

exports.emitMessageTo = (to, message, data) => {
  websocket.to(to).emit(message, data);
}

exports.findSocketConnection = token => connections.filter(value => value.token === token)[0];
