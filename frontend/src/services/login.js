// Imports
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

// Login user
const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// Exports
const exports = { login }
export default exports