import { useState } from 'react'
import episodepostService from './services/episodeposts'
import axios from 'axios'

const App = () => {

  const [show, setShow] = useState('')
  const [showList, setShowList] = useState([])
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])


  const handleOnSubmitForm = async (event) => {
    event.preventDefault()
    
    // Search
    const searchResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${show}&include_adult=false`)

    setShowList(searchResult.data.results)

    console.log(searchResult.data.results)
    
    // // Get show id from search
    // const showId = searchResult.data.results[0].id
    // console.log('show id:', showId)
    
    // // Get seasons from show id
    // const tv = await axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    // console.log('tv:', tv.data.seasons)
    
    // // Get episodes from each season
    // tv.data.seasons.forEach(async season => {
      //   const seasonDetail = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      //   console.log(seasonDetail.data)
      // })
      
  }
    
  const handleOnChangeShow = event => {
    setShow(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleOnSubmitForm}>
        <div>show: <input value={show} onChange={handleOnChangeShow} /></div>
        <button type="submit">submit</button>
      </form>
      <ul>
        {showList.map(show => {
          return (
            <li key={show.id}>{show.name}</li>
            )
          })}
      </ul>
    </>
  )
}

export default App
