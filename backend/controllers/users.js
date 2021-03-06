// Imports
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// GET routes

// GET all users
usersRouter.get('/', async (request, response) => {
  // Return all users
  const users = await User.find({})
    .populate('episodePosts')
    .populate('episodeComments')
  return response.json(users)
})

// GET user by id
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('episodePosts')
    .populate('episodeComments')
  // If user found
  if (user) {
    response.json(user)
  }
  else {
    response.status(404).end()
  }
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

  // Save user
  try {
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