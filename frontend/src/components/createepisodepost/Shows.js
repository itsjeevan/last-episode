// Import
import Show from './Show'

// List of shows
const Shows = ({ shows, setShowSelected, setSeasons, setEpisodes }) => (
  <div>
    <h1>Shows</h1>
    {shows.map(show => (
      <Show
        key={show.id}
        show={show}
        setShowSelected={setShowSelected}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
    ))}
  </div>
)

// Export
export default Shows