import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodeposts'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async episodePostData => {
  const response = await axios.post(baseUrl, episodePostData)
  return response.data
}

const exports = { getAll, create }
export default exports