const { v4: uuidv4 } = require('uuid');
const cache = require('../cache/connection');

module.exports = {
  async generate(request, response) {
    const token = uuidv4();
    const options = {};
    const data = [];

    const value = {
      token,
      options,
      data,
    };

    await cache.set(token, JSON.stringify(value));
    await cache.expire(token, process.env.TOKEN_DEFAULT_EXPIRATION);

    cache.get(token, (err, reply) => {
      response.json(JSON.parse(reply));
    });
  },
};
