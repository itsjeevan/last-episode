// Imports
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

// Create user
const create = async userData => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

// Exports
const exports = { create }
export default exports