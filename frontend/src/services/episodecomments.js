import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/episodecomments'

const create = async episodeCommentData => {
  const response = await axios.post(baseUrl, episodeCommentData)
  return response.data
}

const exports = { create }
export default exports