// Imports
const episodeCommentsRouter = require('express').Router()
const episodeComment = require('../models/episodeComment')
const User = require('../models/user')
const episodePost = require('../models/episodePost')
const jwt = require('jsonwebtoken')
const helper = require('../utils/helper')

// GET routes

// GET all episode comments (Unused endpoint)
episodeCommentsRouter.get('/', async (request, response) => {
  // Return all comments
  const comments = await episodeComment.find({})
    .populate('user')
    .populate('episodePost')
  response.json(comments)
})

// GET episode comment by id (Unused endpoint)
episodeCommentsRouter.get('/:id', async (request, response) => {
  // Find comment
  const comment = await episodeComment.findById(request.params.id)
    .populate('user')
    .populate('episodePost')
  // If comment found
  if (comment) {
    response.json(comment)
  }
  // 404 if not found
  else {
    response.status(404).end()
  }
})

// POST routes

// POST new episode comment
episodeCommentsRouter.post('/', async (request, response) => {
  const { content, episodePostId } = request.body

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

  // Error handle CastError
  try {
    // Find user by id
    var userFound = await User.findById(decodedToken.id)
    // Find episode post by id
    var episodePostFound = await episodePost.findById(episodePostId)
  }
  catch(exception) {
    return response.status(400).json({ error: 'Error: Malformatted id' })
  }
  // Error handle TypeError
  if (!userFound) {
    return response.status(400).json({ error: 'Error: No user found' })
  }
  if (!episodePostFound) {
    return response.status(400).json({ error: 'Error: No episode post found' })
  }

  // Create comment object
  const comment = new episodeComment({
    content,
    date: new Date(),
    user: userFound._id,
    episodePost: episodePostFound._id
  })

  // Error handle ValidationError
  try {
    // Save episode comment
    var savedEpisodeComment = await comment.save()
    userFound.episodeComments = userFound.episodeComments.concat(savedEpisodeComment._id)
    episodePostFound.episodeComments = episodePostFound.episodeComments.concat(savedEpisodeComment._id)
    await userFound.save()
    await episodePostFound.save()
  }
  catch(exception) {
    return response.status(422).json({
      error: 'Error: Could not create comment'
    })
  }
  response.json(await savedEpisodeComment.populate({
    path: 'user',
    select: 'username'
  }))
})

// Exports
module.exports = episodeCommentsRouter