// Imports
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// GET routes

// GET all users
usersRouter.get('/', async (request, response) => {
  // Return all users
  const users = await User.find({})
  return response.json(users)
})

// GET user by id
usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    // If user found
    if (user) {
      response.json(user)
    }
    else {
      response.status(404).end()
    }
  }
  catch(exception) {
    next(exception)
  }
})


// POST routes

// POST new user
usersRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username taken'
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
    next(exception)
  }
})

// Exports
module.exports = usersRouter