// Imports
import EpisodePostSingle from '../episodeposts/EpisodePostSingle'
import styled from 'styled-components'

// User page showing episode posts commented on
const User = ({ episodePostsCommented }) => {

  return (
    <>
      <Heading>You commented on</Heading>
      <Container>
        {
          episodePostsCommented.map(episodePost => (
            <EpisodePostSingle key={episodePost.id} episodePost={episodePost} />
          ))
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
  gap: ${props => props.theme.space.large};
`

// Export
export default User