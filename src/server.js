require('dotenv').config();

const server = require('./app');
const port = process.env.PORT || 80;

console.log(port);

server.listen(port);
