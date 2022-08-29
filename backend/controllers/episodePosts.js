// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('../utils/helper')

// GET routes

// GET all episode posts
episodePostsRouter.get('/', async (request, response) => {
  // Return all posts
  const posts = await episodePost.find({})
    .select({
      showName: 1,
      episodeNumber: 1,
      episodeName: 1,
      episodeInfo: 1,
      episodeImage: 1,
    })
    .sort({
      date: 'descending'
    })
  response.json(posts)
})

// GET episode post by id
episodePostsRouter.get('/:id', async (request, response) => {
  // Find post
  const post = await episodePost.findById(request.params.id)
    .select({
      date: 0,
      user: 0,
    })
    .populate({
      path: 'episodeComments',
      select: {
        episodePost: 0,
      },
      populate: {
        path: 'user',
        select: 'username'
      },
      options: { sort: { 'date': 'descending' } }
    })
  // If post found
  if (post) {
    response.json(post)
  }
  // 404 if not found
  else {
    response.status(404).end()
  }
})

// POST routes

// POST new episode post
episodePostsRouter.post('/', async (request, response) => {
  const { showName, showImage, seasonName, seasonImage, episodeNumber, episodeName, episodeInfo, episodeImage } = request.body

  // Call helper function and get token
  const token = helper.getTokenFrom(request)
  // Error handle JsonWebTokenError
  try {
    // Verify validity of token
    var decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch {
    return response.status(401).json({ error: 'Error: Invalid token' })
  }

  // Check if episode post already exists
  const episodePostFound = await episodePost.find({ showName, seasonName, episodeNumber })
  if (episodePostFound.length !== 0) {
    return response.status(400).json({
      error: 'Error: Episode post already exists'
    })
  }

  // Error handle CastError
  try {
    // Find user by id
    var userFound = await User.findById(decodedToken.id)
  }
  catch(exception) {
    return response.status(400).json({ error: 'Error: Malformatted id' })
  }
  // Error handle TypeError
  if (!userFound) {
    return response.status(400).json({ error: 'Error: No user found' })
  }

  // Create post object
  const post = new episodePost({
    showName,
    showImage,
    seasonName,
    seasonImage,
    episodeNumber,
    episodeName,
    episodeInfo,
    episodeImage,
    date: new Date(),
    user: userFound._id
  })

  // Error handle ValidationError
  try {
    // Save episode post
    var savedEpisodePost = await post.save()
    // Update and save user's episode posts
    userFound.episodePosts = userFound.episodePosts.concat(savedEpisodePost._id)
    await userFound.save()
  }
  catch(exception) {
    return response.status(422).json({
      error: 'Error: Could not create episode post'
    })
  }

  response.json(savedEpisodePost)
})

// Exports
module.exports = episodePostsRouter