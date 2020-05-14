const cache = require('../cache/connection');
const { v1: uuidv1 } = require('uuid');
const { findSocketConnection, emitMessageTo } = require('../services/websocket');

module.exports = {
  index(request, response) {
    const { token } = request.params;

    cache.get(token, async (err, reply) => {
      let value = JSON.parse(reply);

      if (request.headers.origin == process.env.WEBSOCKET_CLIENT) {
        return response.json(value);
      }

      const data = {
        id: uuidv1(),
        method: request.method.toUpperCase(),
        headers: request.headers,
        body: Object.keys(request.body).length > 0 ? request.body : null,
        query: Object.keys(request.query).length > 0 ? request.query : null,
        updatedAt: Date.now(),
      };

      value.data.unshift(data);

      await cache.set(token, JSON.stringify(value));

      const socketConnection = findSocketConnection(token);

      if (!socketConnection) {
        return response.json(value);
      }

      emitMessageTo(socketConnection.id, 'new-request', data);

      return response.json(value);
    });
  },
};
