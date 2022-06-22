// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')
const User = require('../models/user')

// GET routes

// GET all episode posts
episodePostsRouter.get('/', async (request, response) => {
  // Return all posts
  const posts = await episodePost.find({})
    .populate('user')
    .populate('episodeComments')
  response.json(posts)
})

// GET episode post by id
episodePostsRouter.get('/:id', async (request, response, next) => {
  try {
    const post = await episodePost.findById(request.params.id)
      .populate('user')
      .populate('episodeComments')
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
  const { showName, episodeSeason, episodeNumber, episodeName, episodeInfo, userId } = request.body

  // Check if episode post already exists
  const episodePostFound = await episodePost.find({ showName, episodeSeason, episodeNumber })
  if (episodePostFound.length !== 0) {
    return response.status(400).json({
      error: 'a post about this episode already exists'
    })
  }

  // Find user by id
  const userFound = await User.findById(userId)

  // Create post object
  const post = new episodePost({
    showName,
    episodeSeason,
    episodeNumber,
    episodeName,
    episodeInfo,
    date: new Date(),
    user: userFound._id
  })

  // Save episode post
  try {
    const savedEpisodePost = await post.save()
    userFound.episodePosts = userFound.episodePosts.concat(savedEpisodePost._id)
    await userFound.save()
    response.json(savedEpisodePost)
  }
  catch(exception) {
    next(exception)
  }
})

// Exports
module.exports = episodePostsRouter