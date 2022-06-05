// JWT
require('dotenv').config();

// Setting up express
const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();

// Connecting to our database
const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

// Setting up morgan which logs incoming requests
const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

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

server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});
