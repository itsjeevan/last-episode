// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')


// GET routes

episodePostsRouter.get('/', async (request, response) => {
  // Return all posts
  const posts = await episodePost.find({})
  response.json(posts)
})

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

episodePostsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // Create post object
  const post = new episodePost({
    showName: body.showName,
    episodeSeason: body.episodeSeason,
    episodeNumber: body.episodeNumber,
    episodeName: body.episodeName,
    episodeInfo: body.episodeInfo
  })

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