// Imports
import { useState } from 'react'
import Seasons from './Seasons'
import Episodes from './Episodes'
import Shows from './Shows'
import ShowSearch from './ShowSearch'
import PropTypes from 'prop-types'

// Create an episode post
const CreateEpisodePost = ({
  episodePosts, setEpisodePosts, setFilteredEpisodePosts, user, setMessage }) => {

  // Store all shows, seasons, and episodes
  const [shows, setShows] = useState(null)
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
        user={user}
        setMessage={setMessage}
      />
      {/* List of shows from search result */}
      {shows
        ?
        <Shows
          shows={shows}
          setShowSelected={setShowSelected}
          setSeasons={setSeasons}
          setEpisodes={setEpisodes}
        />
        : null
      }
      {/* List of seasons from selected show */}
      {seasons.length
        ?
        <Seasons
          showSelected={showSelected}
          seasons={seasons}
          setSeasonSelected={setSeasonSelected}
          setEpisodes={setEpisodes}
        />
        : null
      }
      {/* List of episodes from selected season */}
      {episodes.length
        ?
        <Episodes
          showSelected={showSelected}
          seasonSelected={seasonSelected}
          episodes={episodes}
          episodePosts={episodePosts}
          setEpisodePosts={setEpisodePosts}
          setFilteredEpisodePosts={setFilteredEpisodePosts}
          setMessage={setMessage}
        />
        : null
      }
    </>
  )
}

// PropTypes
CreateEpisodePost.propTypes = {
  episodePosts: PropTypes.array.isRequired,
  setEpisodePosts: PropTypes.func.isRequired,
  user: PropTypes.object,
  setMessage: PropTypes.func.isRequired
}

// Export
export default CreateEpisodePost