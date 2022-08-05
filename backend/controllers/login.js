// Imports
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// POST routes

// Login user
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // Find user by username
  const user = await User.findOne({ username })

  // Check if password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // If no user found or if incorrect password then return 401
  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: 'Error: Invalid username or password'
    })
  }

  // Create JavaScript object for token
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Create token digitally signed using environment variable
  const token = jwt.sign(
    userForToken,
    process.env.JWT_SECRET
  )

  // Return token and username
  response
    .status(200)
    .send({ token, username: user.username, id: user.id })
})

// Exports
module.exports = loginRouter