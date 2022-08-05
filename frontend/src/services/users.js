// Imports
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

// Create user
const create = async userData => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

// Get episode posts commented on by user id
const getEpisodePostsCommented = async id => {
  const response = await axios.get(`${baseUrl}/${id}/comments/episodeposts`)
  return response.data
}

// Exports
const exports = { create, getEpisodePostsCommented }
export default exports