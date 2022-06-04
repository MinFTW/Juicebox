// JWT
require('dotenv').config();

// Setting up express
const PORT = 3000;
const express = require('express');
const server = express();

// Setting up morgan which logs incoming requests
const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

// Connecting to our database
const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});

// This will run on every request
server.use((req, res, next) => {
  console.log('<____Body Logger START____>');
  console.log(req.body);
  console.log('<_____Body Logger END_____>');

  next();
});

// Setting up our routes which all start with /api
const apiRouter = require('./api');
server.use('/api', apiRouter);
