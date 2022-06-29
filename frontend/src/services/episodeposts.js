// Import
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodeposts'

// Prepend token with 'bearer'
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// Get all episode posts
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// Create an episode post
const create = async episodePostData => {
  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, episodePostData, config)
  return response.data
}

// Exports
const exports = { setToken, getAll, create }
export default exports