// Imports
import EpisodePostsSingle from '../episodeposts/EpisodePostsSingle'
import styled from 'styled-components'

// User page showing episode posts commented on
const User = ({ episodePostsCommented }) => {

  return (
    <>
      <Heading>You commented on</Heading>
      <Container>
        {
          episodePostsCommented.length
            ? episodePostsCommented.map(episodePost => (
              <EpisodePostsSingle key={episodePost.id} episodePost={episodePost} />
            ))
            : <TextNoResults>No results</TextNoResults>
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
const TextNoResults = styled.p`
  text-align: center;
  width: 100%;
`

// Export
export default User