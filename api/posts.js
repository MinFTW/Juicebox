const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');

// This will log to the console everytime a request is made to this endpoint
postsRouter.use((req, res, next) => {
  console.log('A request is being made to /posts');

  next();
});

// This will get all the users stored in our database and send back a user json
postsRouter.get('/', async (req, res) => {
  const posts = await getAllPosts();

  res.send({ posts });
});

module.exports = postsRouter;