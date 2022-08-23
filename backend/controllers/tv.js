// Imports
const tvRouter = require('express').Router()
const axios = require('axios')

// GET routes

// GET shows from search result
tvRouter.get('/search/:showInput', async (request, response) => {
  const showsResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API}&language=en-US&query=${request.params.showInput}&include_adult=false`)
  response.json(showsResult.data.results)
})

// GET seasons from show
tvRouter.get('/tv/:showId', async (request, response) => {
  const seasonsResult = await axios.get(`https://api.themoviedb.org/3/tv/${request.params.showId}?api_key=${process.env.TMDB_API}&language=en-US`)
  response.json(seasonsResult.data.seasons)
})

// Get episodes from season
tvRouter.get('/tv/:showId/:seasonNumber', async (request, response) => {
  const seasonResult = await axios.get(`https://api.themoviedb.org/3/tv/${request.params.showId}/season/${request.params.seasonNumber}?api_key=${process.env.TMDB_API}&language=en-US`)
  response.json(seasonResult.data.episodes)
})

// Exports
module.exports = tvRouter