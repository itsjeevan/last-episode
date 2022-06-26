import Season from './Season'

const Seasons = ({
  seasons,
  showId,
  setEpisodes,
  setSeasonId,
  setSeasonNumber,
  setSeasonImage
}) => {

  return (
    <div>
      <h1>Seasons</h1>
      {seasons.map(season => {
        return (
          <Season
            key={season.id}
            season={season}
            showId={showId}
            setEpisodes={setEpisodes}
            setSeasonId={setSeasonId}
            setSeasonNumber={setSeasonNumber}
            setSeasonImage={setSeasonImage}
          />
        )
      })}
    </div>
  )
}

export default Seasons