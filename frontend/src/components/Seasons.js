import Season from './Season'
import axios from 'axios'

const Seasons = ({
  seasons,
  showId,
  setEpisodes,
  setSeasonId,
  setSeasonNumber,
  setSeasonImage
}) => {

  const handleOnClickSeason = async (season) => {
    const seasonDetail = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodes(seasonDetail.data.episodes)
    setSeasonId(season.id)
    setSeasonNumber(season.season_number)
    setSeasonImage(season.poster_path)
  }

  return (
    <div>
      <h1>Seasons</h1>
      {seasons.map(season => {
        return (
          <Season
            key={season.id}
            season={season}
            onClickSeason={() => handleOnClickSeason(season)}
          />
        )
      })}
    </div>
  )
}

export default Seasons