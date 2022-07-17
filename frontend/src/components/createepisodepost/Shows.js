// Import
import Show from './Show'
import styled from 'styled-components'

// List of shows
const Shows = ({ shows, setShowSelected, setSeasons, setEpisodes }) => (
  <>
    <Heading>Shows</Heading>
    <Container>
      {shows.map(show => (
        <Show
          key={show.id}
          show={show}
          setShowSelected={setShowSelected}
          setSeasons={setSeasons}
          setEpisodes={setEpisodes}
        />
      ))}
    </Container>
  </>
)

// Styles
const Heading = styled.h1`
  margin-top: ${props => props.theme.space.large};
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  
`

// Export
export default Shows