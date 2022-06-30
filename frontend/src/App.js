// Imports
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Login from './components/login/Login'
import EpisodePosts from './components/episodeposts/EpisodePosts'
import EpisodePost from './components/episodeposts/EpisodePost'
import CreateEpisodePost from './components/createepisodepost/CreateEpisodePost'
import { useState, useEffect } from 'react'
import episodePostService from './services/episodeposts'

// App
const App = () => {

  const [episodePosts, setEpisodePosts] = useState([])

  // Get episode posts from database on initial render
  useEffect(() => {
    episodePostService.getAll().then(episodePosts => setEpisodePosts(episodePosts))
  }, [])

  // Everytime browser url changes, check for match
  const match = useMatch('/:id')
  // If match found, find individual episode post
  const episodePost = match
    ? episodePosts.find(episodePost => episodePost.id === match.params.id)
    : null

  return (
    <>
      {/* Create links that modify url */}
      <div>
        <Link to="/">Browse</Link>
        <Link to="/create">Create</Link>
        <Link to="/login">Login</Link>
      </div>
      {/* Render component based on url */}
      <Routes>
        <Route path="/" element={<EpisodePosts episodePosts={episodePosts} />} />
        <Route path="/:id" element={<EpisodePost episodePost={episodePost} />} />
        <Route path="/create" element={<CreateEpisodePost />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

// Export
export default App
