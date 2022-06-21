// Imports
const express = require('express')
const app = express()
const episodePostsRouter = require('./controllers/episodePosts')
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
// Episode Posts Router
app.use('/api/episodeposts', episodePostsRouter)
// Users Router
app.use('/api/users', usersRouter)
// Unknown endpoint
app.use(middleware.unknownEndpoint)
// Error handling
app.use(middleware.errorHandler)

// Exports
module.exports = app