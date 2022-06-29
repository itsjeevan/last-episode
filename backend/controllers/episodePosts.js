// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


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
episodePostsRouter.get('/:id', async (request, response) => {
  // Find post
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
})


// Helper function that isolates token from authorization header
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// POST routes

// POST new episode post
episodePostsRouter.post('/', async (request, response) => {
  const { showName, showImage, seasonNumber, seasonImage, episodeNumber, episodeName, episodeInfo, episodeImage } = request.body

  // Call helper function and get token
  const token = getTokenFrom(request)
  // Verify validity of token
  try {
    var decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Check if episode post already exists
  const episodePostFound = await episodePost.find({ showName, seasonNumber, episodeNumber })
  if (episodePostFound.length !== 0) {
    return response.status(400).json({
      error: 'a post about this episode already exists'
    })
  }

  // Find user by id
  const userFound = await User.findById(decodedToken.id)

  // Create post object
  const post = new episodePost({
    showName,
    showImage,
    seasonNumber,
    seasonImage,
    episodeNumber,
    episodeName,
    episodeInfo,
    episodeImage,
    date: new Date(),
    user: userFound._id
  })

  // Save episode post
  const savedEpisodePost = await post.save()
  // Update and save user's episode posts
  userFound.episodePosts = userFound.episodePosts.concat(savedEpisodePost._id)
  await userFound.save()

  response.json(savedEpisodePost)
})

// Exports
module.exports = episodePostsRouter