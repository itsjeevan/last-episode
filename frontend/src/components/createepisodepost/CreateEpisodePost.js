import Seasons from './Seasons'
import Episodes from './Episodes'
import Shows from './Shows'
import ShowSearch from './ShowSearch'
import { useState } from 'react'

const CreateEpisodePost = () => {

  const [shows, setShows] = useState([])
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
    
  const [showSelected, setShowSelected] = useState({})
  const [seasonSelected, setSeasonSelected] = useState({})

  return (
    <>
      <ShowSearch
        setShows={setShows}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
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

export default CreateEpisodePost