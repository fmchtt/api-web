'use strict'
const app = require('../src/app.js');
const http = require('http');
const debug = require('debug')('api-web:server');

const port = 3000;

app.set('port', port);
const server = http.createServer(app);



console.log('Server rodando na porta: ' + port);

server.listen(port);
