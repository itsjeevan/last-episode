// Imports
import { Routes, Route, useMatch } from 'react-router-dom'
import Login from './components/login/Login'
import EpisodePosts from './components/episodeposts/EpisodePosts'
import EpisodePost from './components/episodeposts/EpisodePost'
import Header from './components/header/Header'
import CreateEpisodePost from './components/createepisodepost/CreateEpisodePost'
import { useState, useEffect } from 'react'
import episodePostService from './services/episodeposts'
import styled, { createGlobalStyle } from 'styled-components/macro'
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
        <Route path="/:id" element={<EpisodePost episodePost={episodePost} />} />
        <Route path="/create" element={<CreateEpisodePost episodePosts={episodePosts} setEpisodePosts={setEpisodePosts} />} />
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
    background: linear-gradient(${props => props.theme.color.primary}, ${props => props.theme.color.quaternary});
    // background: linear-gradient(#e66465, #9198e5);
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
    border: none;
    font-size: 20px;
    border-radius: ${props => props.theme.radius};
    padding: 0 ${props => props.theme.space.large};
    border: 4px solid transparent;
    &:focus {
      outline: none;
      border: 4px solid ${props => props.theme.color.tertiary};
    }
  }
  button {
    display: block;
    background-color: ${props => props.theme.color.secondary};
    border: none;
    color: white;
    font-size: 20px;
    padding: ${props => props.theme.space.medium} ${props => props.theme.space.large};
    border-radius ${props => props.theme.radius};
    cursor: pointer;
    &:hover {
      background: ${props => props.theme.color.tertiary};
    }
    &:focus {
      background: ${props => props.theme.color.tertiary};
      outline: none;
    }
  }
`
const Container = styled.div`
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${props => props.theme.space.large};
`

// Export
export default App
