require('dotenv').config();

const server = require('./app');
const port = process.env.PORT || 5000;

console.log(port);

server.listen(port);
