// Imports
import { Link } from 'react-router-dom'

// List of episode posts
const EpisodePosts = ({ episodePosts }) => {

  return (
    <>
      <h1>Episode Posts</h1>
      {episodePosts.map(episodePost => (
        <div key={episodePost.id}>
          <Link to={`/${episodePost.id}`}>
            {episodePost.showName} - S{episodePost.seasonNumber}:E{episodePost.episodeNumber} - {episodePost.episodeName}
          </Link>
        </div>
      ))}
    </>
  )
}

// Export
export default EpisodePosts