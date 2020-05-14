const express = require('express');

const HookController = require('./controllers/HookController');
const CatchController = require('./controllers/CatchController');

const route = express.Router();

route.get('/', (request, response) => response.send('ok!'));

route.post('/hooks', HookController.generate);
route.all('/c/:token', CatchController.index);

module.exports = route;
