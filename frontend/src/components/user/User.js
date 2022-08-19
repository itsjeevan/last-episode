// Imports
import { useEffect, useState } from 'react'
import EpisodePostSingle from '../episodeposts/EpisodePostSingle'
import userService from '../../services/users'
import styled from 'styled-components'

// User page showing episode posts commented on
const User = () => {

  const [episodePostsCommented, setEpisodePostsCommented] = useState([])

  // Get episode posts commented on
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    userService.getEpisodePostsCommented(user.id)
      .then(response => {
        setEpisodePostsCommented(response)
      })
  }, [])

  return (
    <>
      <Heading>You commented on</Heading>
      <Container>
        {
          episodePostsCommented.map(episodePost => (
            <EpisodePostSingle key={episodePost.id} episodePost={episodePost} />
          )).reverse()
        }
      </Container>
    </>
  )
}

// Styles
const Heading = styled.h1`
  margin-bottom: ${props => props.theme.space.large};
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
`

// Export
export default User