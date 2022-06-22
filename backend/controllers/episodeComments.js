// Imports
const episodeCommentsRouter = require('express').Router()
const episodeComment = require('../models/episodeComment')
const User = require('../models/user')
const episodePost = require('../models/episodePost')

// GET routes

// GET all episode comments
episodeCommentsRouter.get('/', async (request, response) => {
  // Return all comments
  const comments = await episodeComment.find({})
    .populate('user')
    .populate('episodePost')
  response.json(comments)
})

// GET episode comment by id
episodeCommentsRouter.get('/:id', async (request, response, next) => {
  try {
    const comment = await episodeComment.findById(request.params.id)
      .populate('user')
      .populate('episodePost')
    // If comment found
    if (comment) {
      response.json(comment)
    }
    // 404 if comment not found
    else {
      response.status(404).end()
    }
  }
  catch(exception) {
    next(exception)
  }
})

// POST routes

// POST new episode comment
episodeCommentsRouter.post('/', async (request, response, next) => {
  const { content, userId, episodePostId } = request.body

  // Find user by id
  const userFound = await User.findById(userId)

  // Find episode post by id
  const episodePostFound = await episodePost.findById(episodePostId)

  // Create comment object
  const comment = new episodeComment({
    content,
    date: new Date(),
    user: userFound._id,
    episodePost: episodePostFound._id
  })

  // Save episode comment
  try {
    const savedEpisodeComment = await comment.save()
    userFound.episodeComments = userFound.episodeComments.concat(savedEpisodeComment._id)
    episodePostFound.episodeComments = episodePostFound.episodeComments.concat(savedEpisodeComment._id)
    await userFound.save()
    await episodePostFound.save()
    response.json(savedEpisodeComment)
  }
  catch(exception) {
    next(exception)
  }
})

// Exports
module.exports = episodeCommentsRouter