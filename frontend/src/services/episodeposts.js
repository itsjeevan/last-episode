import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/episodeposts'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const exports = { getAll }
export default exports