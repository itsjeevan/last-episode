// Imports
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodecomments'

// Create an episode comment
const create = async episodeCommentData => {
  const response = await axios.post(baseUrl, episodeCommentData)
  return response.data
}

// Exports
const exports = { create }
export default exports