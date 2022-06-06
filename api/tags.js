const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log('A request is being made to /tags');

  next();
});

tagsRouter.get('/', async (req, res, next) => {
  try {
    const tags = await getAllTags();

    res.send({ tags });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // cannot use URL's with hash tags, need to decode first
  const tagName = decodeURIComponent(req.params.tagName);

  try {
    const postsByTagName = await getPostsByTagName(tagName);

    const posts = postsByTagName.filter((post) => {
      if (post.active) return true;
      if (req.user && req.user.id === post.author.id) return true;
      return false;
    });

    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
