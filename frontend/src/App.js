// Imports
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Login from './components/login/Login'
import EpisodePosts from './components/episodeposts/EpisodePosts'
import EpisodePost from './components/episodeposts/EpisodePost'
import Header from './components/header/Header'
import CreateEpisodePost from './components/createepisodepost/CreateEpisodePost'
import { useState, useEffect } from 'react'
import episodePostService from './services/episodeposts'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`
const Navigation = styled.div`
  margin-bottom: 20px;
`

const StyledLink = styled(Link)`
  margin-right: 10px;
`

// App
const App = () => {

  const [user, setUser] = useState(null)
  const [episodePosts, setEpisodePosts] = useState([])

  // On initial render
  useEffect(() => {
    // Get episode posts from database
    episodePostService.getAll().then(episodePosts => setEpisodePosts(episodePosts))
    // Check if user details found in local storage
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // Everytime browser url changes, check for match
  const match = useMatch('/:id')
  // If match found, find individual episode post
  const episodePost = match
    ? episodePosts.find(episodePost => episodePost.id === match.params.id)
    : null

  return (
    <Container>
      <Header />
      {/* Create links that modify url */}
      <Navigation>
        <StyledLink to="/">Browse</StyledLink>
        <StyledLink to="/create">Create</StyledLink>
        {user
          ? <StyledLink to="/login">{user.username}</StyledLink>
          : <StyledLink to="/login">Login</StyledLink>
        }
      </Navigation>
      {/* Render component based on url */}
      <Routes>
        <Route path="/" element={<EpisodePosts episodePosts={episodePosts} />} />
        <Route path="/:id" element={<EpisodePost episodePost={episodePost} />} />
        <Route path="/create" element={<CreateEpisodePost episodePosts={episodePosts} setEpisodePosts={setEpisodePosts} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
      </Routes>
    </Container>
  )
}

// Export
export default App
