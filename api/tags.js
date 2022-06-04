const express = require('express');
const tagsRouter = express.Router();
const { getAllTags } = require('../db');

// This will log to the console everytime a request is made to this endpoint
tagsRouter.use((req, res, next) => {
  console.log('A request is being made to /tags');

  next();
});

// This will get all the users stored in our database and send back a user json
tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({ tags });
});

module.exports = tagsRouter;