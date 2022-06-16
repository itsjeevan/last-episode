// Imports
require('dotenv').config()
const express = require('express')
const app = express()
const episodePost = require('./models/episodePost')


// Middleware

// Convert JSON to JavaScript object
app.use(express.json())


// GET routes

app.get('/api/posts/:id', (request, response, next) => {
  episodePost.findById(request.params.id)
    .then(post => {
      // If post found
      if (post) {
        response.json(post)
      }
      // 404 if post not found
      else {
        response.status(404).end()
      }
    })
    // Catch error if 'id' doesn't match mongo identifier format
    .catch(error => next(error))
})

app.get('/api/posts', (request, response) => {
  // Return all posts
  episodePost.find({}).then(posts => {
    response.json(posts)
  })
})


// POST routes

app.post('/api/posts', (request, response) => {
  const body = request.body

  // If content missing, respond with error
  if (
    !body.showName ||
    !body.episodeSeason ||
    !body.episodeNumber ||
    !body.episodeName ||
    !body.episodeInfo) {
    // Return, otherwise code continues
    return response.status(400).json({ error: 'Missing content' })
  }
  
  // Create post object
  const post = new episodePost({
    showName: body.showName,
    episodeSeason: body.episodeSeason,
    episodeNumber: body.episodeNumber,
    episodeName: body.episodeName,
    episodeInfo: body.episodeInfo
  })

  post.save().then(savedEpisodePost => {
    response.json(savedEpisodePost)
  })

})

// Error handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

// Middleware for error handling
app.use(errorHandler)

// Server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})