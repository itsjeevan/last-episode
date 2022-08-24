// Imports
import axios from 'axios'
import { parseToken } from '../utils/helper'

const baseUrl = '/api/episodecomments'

// Create an episode comment
const create = async episodeCommentData => {
  // Get token
  const token = parseToken()

  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, episodeCommentData, config)
  return response.data
}

// Exports
const exports = { create }
export default exports