import { useState } from 'react'
import axios from 'axios'

const ShowSearch = ({ setShows, setSeasons, setEpisodes }) => {

  const [showInput, setShowInput] = useState('')
  
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  const handleOnSubmitFormShowSearch = async event => {
    event.preventDefault()
    const showsResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
    setShows(showsResult.data.results)
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

export default ShowSearch