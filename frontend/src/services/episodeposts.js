import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodeposts'

const create = async episodePostData => {
  const response = await axios.post(baseUrl, episodePostData)
  return response.data
}

const exports = { create }
export default exports