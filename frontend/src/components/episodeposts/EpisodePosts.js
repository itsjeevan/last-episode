// Imports
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// List of episode posts
const EpisodePosts = ({ episodePosts }) => {

  return (
    <>
      <Heading>Episodes</Heading>
      <Container>
        {episodePosts.map(episodePost => (
          <SubContainer to={`/${episodePost.id}`} key={episodePost.id}>
            <Image
              alt={episodePost.showName}
              src={`https://image.tmdb.org/t/p/w500/${episodePost.episodeImage}`}
            />
            <TextContainer>
              <ShowName>{episodePost.showName}</ShowName>
              <p>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}</p>
            </TextContainer>
          </SubContainer>
        ))}
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
const SubContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  height: fit-content;
  border-radius: ${props => props.theme.radius};
  cursor: pointer;
  color: white;
  text-decoration: none;
  &:hover {
    ${props => props.theme.highlight}
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius} ${props => props.theme.radius} 0 0;
  width: 100%;
`
const TextContainer = styled.div`
  padding: 20px;
  background: ${props => props.theme.color.secondary};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
`
const ShowName = styled.p`
  font-size: 40px;
  margin-bottom: ${props => props.theme.space.small};
`

// Export
export default EpisodePosts