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
  margin: ${props => props.theme.space.large} 0;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
`

// Export
export default Shows