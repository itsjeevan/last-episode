import axios from 'axios'

const Season = ({
  season,
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
    <div onClick={() => handleOnClickSeason(season)}>
      Season {season.season_number}
      <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
    </div>
  )
}

export default Season