// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')


// GET routes

// GET all episode posts
episodePostsRouter.get('/', async (request, response) => {
  // Return all posts
  const posts = await episodePost.find({})
  response.json(posts)
})

// GET episode post by id
episodePostsRouter.get('/:id', async (request, response, next) => {
  try {
    const post = await episodePost.findById(request.params.id)
    // If post found
    if (post) {
      response.json(post)
    }
    // 404 if post not found
    else {
      response.status(404).end()
    }
  }
  catch(exception) {
    next(exception)
  }
})


// POST routes

// POST new episode post
episodePostsRouter.post('/', async (request, response, next) => {
  const { showName, episodeSeason, episodeNumber, episodeName, episodeInfo } = request.body

  // Create post object
  const post = new episodePost({
    showName,
    episodeSeason,
    episodeNumber,
    episodeName,
    episodeInfo
  })

  // Save episode post
  try {
    const savedEpisdePost = await post.save()
    response.json(savedEpisdePost)
  }
  catch(exception) {
    next(exception)
  }
})

// Exports
module.exports = episodePostsRouter