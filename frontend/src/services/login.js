// Imports
import axios from 'axios'

const baseUrl = '/api/login'

// Login user
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// Exports
const exports = { login }
export default exports