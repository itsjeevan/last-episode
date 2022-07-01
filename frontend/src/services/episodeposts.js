// Imports
import axios from 'axios'
import { parseToken } from '../utils/helper'

const baseUrl = 'http://localhost:3001/api/episodeposts'

// Get all episode posts
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// Get episode post by id
const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// Create an episode post
const create = async episodePostData => {
  // Get token
  const token = parseToken()

  // Set token to authorization header
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, episodePostData, config)
  return response.data
}

// Exports
const exports = { getAll, getOne, create }
export default exports