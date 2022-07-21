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
              <ShowSeason>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}</ShowSeason>
              <ShowInfo>{episodePost.episodeInfo}</ShowInfo>
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
  padding: ${props => props.theme.space.large};
  background: ${props => props.theme.color.secondary};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
`
const ShowName = styled.p`
  font-size: 40px;
`
const ShowSeason = styled.p`
  margin: ${props => props.theme.space.medium} 0;
`
const ShowInfo = styled.p`
  font-weight: 300;
`

// Export
export default EpisodePosts