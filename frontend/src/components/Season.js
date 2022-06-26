const Season = ({ season, onClickSeason }) => {
  return (
    <div onClick={onClickSeason}>
      Season {season.season_number}
      <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
    </div>
  )
}

export default Season