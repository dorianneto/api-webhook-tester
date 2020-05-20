require('dotenv').config();

const express = require('express');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

const { setUpWebsocket } = require('./services/websocket');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3333;

setUpWebsocket(server, {
  origins: process.env.WEBSOCKET_CLIENT,
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

server.listen(port);
