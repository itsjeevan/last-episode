// Import dotenv
require('dotenv').config()

// Import express application and assign it to 'app' variable
const express = require('express')
const app = express()


const episodePost = require('./models/episodePost')



// Middleware

// Convert JSON to JavaScript object
app.use(express.json())

// Posts
let episodePosts = [
  {
    id: 1,
    show_name: "Seinfeld",
    episode_season: 4,
    episode_number: 11,
    episode_name: "The Contest",
    episode_info: "George's mother throws her back out when she falls down after catching George performing a personal act; the gang partakes in a contest of self-denial.",
  },
  {
    id: 2,
    show_name: "Seinfeld",
    episode_season: 5,
    episode_number: 2,
    episode_name: "The Opposite",
    episode_info: "George decides to turn his life around by doing the exact opposite of what he would usually do. Elaine is having a lot of bad luck. Jerry keeps breaking even. Kramer gets the coffee table book published.",
  }
]

// Routes
app.get('/api/posts/:id', (request, response) => {
  // Find post
  const id = Number(request.params.id)
  const episodePost = episodePosts.find(post => post.id === id)
  // If post found
  if (episodePost) {
    response.json(episodePost)
  }
  // 404 if post not found
  else {
    response.status(404).end()
  }
})

app.get('/api/posts', (request, response) => {
  response.json(episodePosts)
})


// Function to generate id
const generateId = () => {
  // Check if notes length is greater than 0
  const maxId = episodePosts.length > 0
    // If it is, find the max value in notes using map and spread syntax
    ? Math.max(...episodePosts.map(n => n.id))
    // If not, then assign 0
    : 0
  return maxId + 1
}

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
    id: generateId(),
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


// Server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})