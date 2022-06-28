// Import
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodeposts'

// Get all episode posts
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// Create an episode post
const create = async episodePostData => {
  const response = await axios.post(baseUrl, episodePostData)
  return response.data
}

// Exports
const exports = { getAll, create }
export default exports