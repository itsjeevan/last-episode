// Imports
const express = require('express')
const app = express()
const episodePostsRouter = require('./controllers/episodePosts')
const episodeCommentsRouter = require('./controllers/episodeComments')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

// Connect to MongoDB
console.log('connecting to MongoDB')
mongoose.connect(process.env.MONGODB_URI)
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })


// Middleware

// Convert JSON to JavaScript object
app.use(express.json())

// Routers

// Users router
app.use('/api/users', usersRouter)
// Episode posts router
app.use('/api/episodeposts', episodePostsRouter)
// Episode comments router
app.use('/api/episodecomments', episodeCommentsRouter)

// Unknown endpoint
app.use(middleware.unknownEndpoint)
// Error handling
app.use(middleware.errorHandler)

// Exports
module.exports = app