const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');

// This will log to the console everytime a request is made to this endpoint
usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');

  next();
});

// This will get all the users stored in our database and send back a user json
usersRouter.get('/', async (req, res) => {
  const users = await getAllUsers();

  res.send({ users });
});

module.exports = usersRouter;
