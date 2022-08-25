// Imports
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// GET routes

// GET all users (Unused endpoint)
usersRouter.get('/', async (request, response) => {
  // Return all users
  const users = await User.find({})
    .populate('episodePosts')
    .populate('episodeComments')
  return response.json(users)
})

// GET user by id (Unused endpoint)
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('episodePosts')
    .populate('episodeComments')
  // If user found
  if (user) {
    response.json(user)
  }
  // 404 if not found
  else {
    response.status(404).end()
  }
})

// GET episode posts that user commented on
usersRouter.get('/:id/comments/episodeposts', async (request, response) => {
  // Get user data, populating episode comments with episode post
  const userData = await User.findById(request.params.id)
    .select('episodeComments')
    .populate({
      path: 'episodeComments',
      select: 'episodePost',
      populate: {
        path: 'episodePost'
      }
    })
  // 404 if not found
  if (!userData) {
    response.status(404).end()
  }
  console.log(userData.episodeComments)
  const finalEpisodePosts = []
  // For each of the episode posts
  userData.episodeComments.forEach(episodeComment => {
    // If the episode comment's episode post is not null
    if (episodeComment.episodePost) {
      // Check if episode post exists to avoid duplicates
      const foundEpisodePost = finalEpisodePosts.find(finalEpisodePost => finalEpisodePost.id === episodeComment.episodePost.id)
      if (!foundEpisodePost) {
        finalEpisodePosts.unshift(episodeComment.episodePost)
      }
    }
  })
  response.json(finalEpisodePosts)
})

// POST routes

// POST new user
usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // Check if username is taken
  const userFound = await User.findOne({ username })
  if (userFound) {
    return response.status(400).json({
      error: 'Error: Username taken'
    })
  }

  // Create hashed password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create user object
  const user = new User({
    username,
    passwordHash
  })

  // Error handle ValidationError & MongoServerError
  try {
    // Save user
    const savedUser = await user.save()
    response.json(savedUser)
  }
  catch(exception) {
    return response.status(422).json({
      error: 'Error: Could not sign up'
    })
  }
})

// Exports
module.exports = usersRouter