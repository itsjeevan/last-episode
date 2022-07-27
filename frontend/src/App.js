// Imports
import { Routes, Route, useMatch } from 'react-router-dom'
import Login from './components/login/Login'
import EpisodePosts from './components/episodeposts/EpisodePosts'
import EpisodePost from './components/episodeposts/EpisodePost'
import Header from './components/header/Header'
import CreateEpisodePost from './components/createepisodepost/CreateEpisodePost'
import { useState, useEffect } from 'react'
import episodePostService from './services/episodeposts'
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

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
      <Normalize />
      <GlobalStyle />
      <Header user={user} setUser={setUser} />
      {/* Render component based on url */}
      <Routes>
        <Route path="/" element={<EpisodePosts episodePosts={episodePosts} />} />
        <Route path="/:id" element={<EpisodePost episodePost={episodePost} episodePosts={episodePosts} setEpisodePosts={setEpisodePosts} user={user}/>} />
        <Route path="/create" element={<CreateEpisodePost episodePosts={episodePosts} setEpisodePosts={setEpisodePosts} user={user} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
      </Routes>
    </Container>
  )
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
    font-size: 75px;
    margin: 0;
  }
  p {
    font-size: 20px;
    margin: 0;
  }
  input {
    width: 500px;
    height: 50px;
    border: none;
    font-size: 20px;
    border-radius: ${props => props.theme.radius};
    padding: 0 ${props => props.theme.space.large};
    &:focus {
      outline-color: ${props => props.theme.color.tertiary};
    }
  }
  button {
    height: 50px;
    display: block;
    background-color: ${props => props.theme.color.secondary};
    border: none;
    color: white;
    font-size: 20px;
    padding: 0 ${props => props.theme.space.large};
    border-radius ${props => props.theme.radius};
    cursor: pointer;
    &:hover,
    &:active {
      background: ${props => props.theme.color.tertiary};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${props => props.theme.color.secondary};
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
