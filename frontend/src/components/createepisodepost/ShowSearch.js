// Import
import { useState } from 'react'
import axios from 'axios'

// Search for shows
const ShowSearch = ({ setShows, setSeasons, setEpisodes }) => {

  // Search input (controlled component)
  const [showInput, setShowInput] = useState('')
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  // Form submission event handler
  const handleOnSubmitFormShowSearch = async event => {
    event.preventDefault()
    // Search for shows via API
    const showsResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
    // Store results
    setShows(showsResult.data.results)
    // Reset seasons & episodes
    setSeasons([])
    setEpisodes([])
  }
  
  return (
    <form onSubmit={handleOnSubmitFormShowSearch}>
      <div>show: <input value={showInput} onChange={handleOnChangeShowInput} /></div>
      <button type="submit">submit</button>
    </form>
  )
}

// Export
export default ShowSearch