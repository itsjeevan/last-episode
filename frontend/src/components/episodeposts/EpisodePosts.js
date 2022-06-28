import EpisodePost from './EpisodePost'
import episodePostService from '../../services/episodeposts'
import { useState, useEffect } from 'react'

const EpisodePosts = () => {

  const [episodePosts, setEpisodePosts] = useState([])

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

export default EpisodePosts