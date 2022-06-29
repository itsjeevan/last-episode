// Import
import Season from './Season'

// List of seasons
const Seasons = ({ showSelected, seasons, setSeasonSelected, setEpisodes }) => (
  <div>
    <h1>Seasons</h1>
    {seasons.map(season => (
      <Season
        key={season.id}
        showSelected={showSelected}
        season={season}
        setSeasonSelected={setSeasonSelected}
        setEpisodes={setEpisodes}
      />
    ))}
  </div>
)

// Export
export default Seasons