require('dotenv').config();

const server = require('./app');
const port = process.env.PORT || 80;
const appInstance = process.env.NODE_APP_INSTANCE || 0;

server.listen(port + appInstance);
