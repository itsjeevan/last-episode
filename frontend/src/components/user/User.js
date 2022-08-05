// Imports
import { useEffect, useState } from 'react'
import userService from '../../services/users'
import styled from 'styled-components'
import EpisodePostSingle from '../episodeposts/EpisodePostSingle'

const User = () => {

  const [episodePostsCommented, setEpisodePostsCommented] = useState([])

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