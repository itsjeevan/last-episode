// Imports
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import EpisodePosts from './components/episodeposts/EpisodePosts'
import EpisodePost from './components/episodeposts/EpisodePost'
import Header from './components/header/Header'
import CreateEpisodePost from './components/createepisodepost/CreateEpisodePost'
import NotFound from './components/notfound/NotFound'
import { useState, useEffect } from 'react'
import episodePostService from './services/episodeposts'
import userService from './services/users'
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'
import Message from './components/notification/Message'
import User from './components/user/User'

// App
const App = () => {

  const [user, setUser] = useState(null)
  const [episodePosts, setEpisodePosts] = useState([])
  const [filteredEpisodePosts, setFilteredEpisodePosts] = useState(episodePosts)
  const [episodePostsCommented, setEpisodePostsCommented] = useState([])

  // On initial render
  useEffect(() => {
    // Get episode posts from database
    episodePostService.getAll().then(episodePosts => {
      setEpisodePosts(episodePosts)
      setFilteredEpisodePosts(episodePosts)
    })
    // @Improve: Security vulnerability
    const loggedUserJSON = window.localStorage.getItem('user')
    // Check if user details found in local storage
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // Get episode posts user commented on
      userService.getEpisodePostsCommented(user.id)
        .then(response => {
          setEpisodePostsCommented(response)
        })
    }
  }, [])

  // Everytime browser url changes, check for match
  const match = useMatch('/episodeposts/:id')
  // If match found, find individual episode post
  const episodePostMatch = match
    ? episodePosts.find(episodePost => episodePost.id === match.params.id)
    : null

  const [message, setMessage] = useState(null)

  return (
    <Container>
      <Normalize />
      <GlobalStyle />
      <Message message={message} />
      <Header
        user={user}
        setUser={setUser}
        setEpisodePostsCommented={setEpisodePostsCommented}
      />
      {/* Render component based on url */}
      <Routes>
        <Route
          path="/"
          element={
            <EpisodePosts
              episodePosts={episodePosts}
              filteredEpisodePosts={filteredEpisodePosts}
              setFilteredEpisodePosts={setFilteredEpisodePosts}
            />
          }
        />
        <Route
          path="/episodeposts/:id"
          element={
            <EpisodePost
              episodePostMatch={episodePostMatch}
              episodePosts={episodePosts}
              setEpisodePosts={setEpisodePosts}
              user={user}
              setMessage={setMessage}
              setEpisodePostsCommented={setEpisodePostsCommented}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateEpisodePost
              episodePosts={episodePosts}
              setEpisodePosts={setEpisodePosts}
              setFilteredEpisodePosts={setFilteredEpisodePosts}
              user={user}
              setMessage={setMessage}
              setEpisodePostsCommented={setEpisodePostsCommented}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} setMessage={setMessage} setEpisodePostsCommented={setEpisodePostsCommented} />}
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute user={user}>
              <User episodePostsCommented={episodePostsCommented}/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  )
}

// ProtectedRoute component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />
  }
  return children
}

// Styles
const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background: ${props => props.theme.color.primary};
    color: white;
    font-family: 'Roboto Condensed', sans-serif;
  }
  h1 {
    margin: 0;
    font-size: 75px;
  }
  h2 {
    margin: 0;
    font-size: 40px;
    font-weight: 400;
  }
  p {
    margin: 0;
    font-size: 20px;
  }
  input {
    // Display & Box Model
    height: 50px;
    border: none;
    border-radius: ${props => props.theme.radius};
    padding: 0 ${props => props.theme.space.large};

    // Other
    font-size: 20px;

    // Pseudo-classes
    &:focus {
      outline-color: ${props => props.theme.color.tertiary};
    }
  }
  button {
    // Display & Box Model
    display: block;
    height: 50px;
    padding: 0 ${props => props.theme.space.large};
    border: none;
    border-radius ${props => props.theme.radius};

    // Color
    color: white;
    background-color: ${props => props.theme.color.secondary};

    // Text
    font-size: 20px;

    // Other
    cursor: pointer;

    // Pseudo-classes
    &:hover,
    &:active {
      background: ${props => props.theme.color.tertiary};
    }
  }
  .highlight {
    ${props => props.theme.highlight}
  }
  .remove-radius {
    border-radius: 0;
  }
`
const Container = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${props => props.theme.space.large} ${props => props.theme.space.large} ${props => props.theme.space.large};
`

// Export
export default App
