// Imports
import Seasons from './Seasons'
import Episodes from './Episodes'
import Shows from './Shows'
import ShowSearch from './ShowSearch'
import { useState } from 'react'

// Create an episode post
const CreateEpisodePost = ({ episodePosts, setEpisodePosts }) => {

  // Store all shows, seasons, and episodes
  const [shows, setShows] = useState([])
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])

  // Store show and season clicked on
  const [showSelected, setShowSelected] = useState({})
  const [seasonSelected, setSeasonSelected] = useState({})

  return (
    <>
      {/* Search for shows */}
      <ShowSearch
        setShows={setShows}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
      {/* List of shows from search result */}
      <Shows
        shows={shows}
        setShowSelected={setShowSelected}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
      {/* List of seasons from selected show */}
      <Seasons
        showSelected={showSelected}
        seasons={seasons}
        setEpisodes={setEpisodes}
        setSeasonSelected={setSeasonSelected}
      />
      {/* List of episodes from selected season */}
      <Episodes
        showSelected={showSelected}
        seasonSelected={seasonSelected}
        episodes={episodes}
        episodePosts={episodePosts}
        setEpisodePosts={setEpisodePosts}
      />
    </>
  )
}

// Export
export default CreateEpisodePost