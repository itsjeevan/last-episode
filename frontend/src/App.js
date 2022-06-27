import { useState } from 'react'
import axios from 'axios'
import Seasons from './components/Seasons'
import Episodes from './components/Episodes'
import Shows from './components/Shows'

const App = () => {

  const [showInput, setShowInput] = useState('')
  
  const [shows, setShows] = useState([])
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
    
  const [showSelected, setShowSelected] = useState({})
  const [seasonSelected, setSeasonSelected] = useState({})

  const handleOnChangeShowInput = event => setShowInput(event.target.value)
  
  const handleOnSubmitFormShowSearch = async event => {
    event.preventDefault()
    const showsResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
    setShows(showsResult.data.results)
    setSeasons([])
    setEpisodes([])
  }

  return (
    <>
      <form onSubmit={handleOnSubmitFormShowSearch}>
        <div>show: <input value={showInput} onChange={handleOnChangeShowInput} /></div>
        <button type="submit">submit</button>
      </form>
      <Shows
        shows={shows}
        setShowSelected={setShowSelected}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
      <Seasons
        showSelected={showSelected}
        seasons={seasons}
        setEpisodes={setEpisodes}
        setSeasonSelected={setSeasonSelected}
      />
      <Episodes
        showSelected={showSelected}
        seasonSelected={seasonSelected}
        episodes={episodes}
      />
    </>
  )
}

export default App
