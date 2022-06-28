// Imports
import EpisodePost from './EpisodePost'
import episodePostService from '../../services/episodeposts'
import { useState, useEffect } from 'react'

// List of episode posts
const EpisodePosts = () => {

  const [episodePosts, setEpisodePosts] = useState([])

  // Get episode posts from database on initial render
  useEffect(() => {
    episodePostService.getAll().then(episodePosts => setEpisodePosts(episodePosts))
  }, [])

  return (
    <>
      <h1>Episode Posts</h1>
      {episodePosts.map(episodePost => (
        <EpisodePost key={episodePost.id} episodePost={episodePost} />
      ))}
    </>
  )
}

// Export
export default EpisodePosts