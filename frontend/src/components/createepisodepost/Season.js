// Import
import axios from 'axios'
import notfound from './404.jpg'
import { onLoad } from '../../utils/helper'

// Individual season
const Season = ({
  scrollToSeasons, seasons, imageLoadCount,
  showSelected, season, setSeasonSelected, setEpisodes }) => {

  // Get episodes of selected season
  const handleOnClickSeason = async season => {
    const seasonResult = await axios.get(`https://api.themoviedb.org/3/tv/${showSelected.id}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodes(seasonResult.data.episodes)
    setSeasonSelected(season)
  }

  return (
    <div onClick={() => handleOnClickSeason(season)}>
      Season {season.season_number}
      <img
        // Increment imageLoadCount, if final image loaded, scroll
        onLoad={() => onLoad(imageLoadCount, seasons.length, scrollToSeasons)}
        width="75"
        alt=""
        src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = notfound
        }}
      />
    </div>
  )
}

// Export
export default Season