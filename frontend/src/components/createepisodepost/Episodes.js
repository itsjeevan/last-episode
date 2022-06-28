// Import
import Episode from './Episode'

// List of episodes
const Episodes = ({ showSelected, seasonSelected, episodes }) => (
  <div>
    <h1>Episodes</h1>
    {episodes.map(episode => (
      <Episode
        key={episode.id}
        showSelected={showSelected}
        seasonSelected={seasonSelected}
        episode={episode}
      />
    ))}
  </div>
)

// Export
export default Episodes