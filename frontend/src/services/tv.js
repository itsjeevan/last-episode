// Imports
import axios from 'axios'

const baseUrl = 'http://localhost:3001/tv'

// GET shows from search result
const getShows = async showInput => {
  const response = await axios.get(`${baseUrl}/search/${showInput}`)
  return response.data
}

// GET seasons from show
const getSeasons = async showId => {
  const response = await axios.get(`${baseUrl}/tv/${showId}`)
  return response.data
}

// GET episodes from season
const getEpisodes = async (showId, seasonNumber) => {
  const response = await axios.get(`${baseUrl}/tv/${showId}/${seasonNumber}`)
  return response.data
}

// Exports
const exports = { getShows, getSeasons, getEpisodes }
export default exports