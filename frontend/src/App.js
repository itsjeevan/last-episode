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
  
  const [showId, setShowId] = useState('')
  const [showName, setShowName] = useState('')
  const [showImage, setShowImage] = useState('')

  const [seasonId, setSeasonId] = useState('')
  const [seasonNumber, setSeasonNumber] = useState('')
  const [seasonImage, setSeasonImage] = useState('')

  const handleOnChangeShowInput = event => setShowInput(event.target.value)
  
  const handleOnSubmitFormShowSearch = async (event) => {
    event.preventDefault()
    const searchResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
    setShows(searchResult.data.results)
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
        setEpisodes={setEpisodes}
        setSeasons={setSeasons}
        setShowId={setShowId}
        setShowName={setShowName}
        setShowImage={setShowImage}
      />
      <Seasons
        seasons={seasons}
        showId={showId}
        setEpisodes={setEpisodes}
        setSeasonId={setSeasonId}
        setSeasonNumber={setSeasonNumber}
        setSeasonImage={setSeasonImage}
      />
      <Episodes
        episodes={episodes}
        showId={showId}
        showName={showName}
        showImage={showImage}
        seasonId={seasonId}
        seasonNumber={seasonNumber}
        seasonImage={seasonImage}
      />
    </>
  )
}

export default App
