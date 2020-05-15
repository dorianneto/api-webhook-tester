require('dotenv').config();

const server = require('./app');
const port = process.env.PORT || 80;

server.listen(port);
