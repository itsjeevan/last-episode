// Import
import Episode from './Episode'

// List of episodes
const Episodes = ({ showSelected, seasonSelected, episodes, episodePosts, setEpisodePosts }) => (
  <div>
    <h1>Episodes</h1>
    {episodes.map(episode => (
      <Episode
        key={episode.id}
        showSelected={showSelected}
        seasonSelected={seasonSelected}
        episode={episode}
        episodePosts={episodePosts}
        setEpisodePosts={setEpisodePosts}
      />
    ))}
  </div>
)

// Export
export default Episodes