import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [show, setShow] = useState('')
  const [showList, setShowList] = useState([])
  const [seasonList, setSeasonList] = useState([])
  const [episodeList, setEpisodeList] = useState([])
  const [showId, setShowId] = useState('')

  const handleOnSubmitForm = async (event) => {
    event.preventDefault()
    const searchResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${show}&include_adult=false`)
    setShowList(searchResult.data.results)
    setSeasonList([])
    setEpisodeList([])
    console.log(searchResult.data)
  }
    
  const handleOnChangeShow = event => {
    setShow(event.target.value)
  }

  const handleOnClickShow = async showId => {
    const seasons = await axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodeList([])
    setSeasonList(seasons.data.seasons)
    setShowId(showId)
    console.log(seasons.data)
  }
  
  const handleOnClickSeason = async (seasonNumber) => {
    const seasonDetail = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    console.log(seasonDetail.data)
    setEpisodeList(seasonDetail.data.episodes)
  }


  return (
    <>
      <form onSubmit={handleOnSubmitForm}>
        <div>show: <input value={show} onChange={handleOnChangeShow} /></div>
        <button type="submit">submit</button>
      </form>
      <h1>Shows</h1>
      <ul>
        {showList.map(show => {
          return (
            <li key={show.id} onClick={() => handleOnClickShow(show.id)}>
              {show.name} ({show.first_air_date.substring(0, 4)})
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`} />
            </li>
            )
          })}
      </ul>
      <h1>Seasons</h1>
      <ul>
        {seasonList.map(season => {
          return (
            <li key={season.id} onClick={() => handleOnClickSeason(season.season_number)}>
              {season.name}
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
            </li>
            )
          })}
      </ul>
      <h1>Episodes</h1>
      <ul>
        {episodeList.map(episode => {
          return (
            <li key={episode.id}>
              <div>
                {episode.episode_number}. {episode.name}
              </div>
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} />
              <p>{episode.overview}</p>
            </li>
            )
          })}
      </ul>
    </>
  )
}

export default App
