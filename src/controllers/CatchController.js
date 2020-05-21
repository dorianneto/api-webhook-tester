const cache = require('../cache/connection');
const url = require('url');
const { v1: uuidv1 } = require('uuid');
const { findSocketConnection, emitMessageTo } = require('../services/websocket');

module.exports = {
  index(request, response) {
    const { token } = request.params;

    cache.get(token, async (err, reply) => {
      let value = JSON.parse(reply);

      const websocketClient = url.parse(process.env.WEBSOCKET_CLIENT).hostname;
      const headerOrigin = request.headers.origin ?
        url.parse(request.headers.origin).hostname : null;

      if (headerOrigin == websocketClient) {
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
