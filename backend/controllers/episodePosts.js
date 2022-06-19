// Imports
const episodePostsRouter = require('express').Router()
const episodePost = require('../models/episodePost')


// GET routes

episodePostsRouter.get('/:id', (request, response, next) => {
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

episodePostsRouter.get('/', (request, response) => {
  // Return all posts
  episodePost.find({}).then(posts => {
    response.json(posts)
  })
})


// POST routes

episodePostsRouter.post('/', (request, response) => {
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

// Exports
module.exports = episodePostsRouter