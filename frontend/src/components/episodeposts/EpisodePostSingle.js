// Imports
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFoundEpisodeSmall from '../../assets/404-episode-small.jpg'

// Single EpisodePost for EpisodePosts
const EpisodePostSingle = ({ episodePost }) => (
  <Container to={`/episodepost/${episodePost.id}`} key={episodePost.id}>
    <Image
      alt={episodePost.showName}
      src={episodePost.episodeImage
        ? `https://image.tmdb.org/t/p/w500/${episodePost.episodeImage}`
        : notFoundEpisodeSmall
      }
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundEpisodeSmall
      }}
    />
    <TextContainer>
      <h2>{episodePost.showName}</h2>
      <ShowSeason>
        Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}
      </ShowSeason>
      <ShowInfo>{episodePost.episodeInfo
        ? episodePost.episodeInfo
        : 'No episode info found.'}
      </ShowInfo>
    </TextContainer>
  </Container>
)

// Styles
const Container = styled(Link)`
  // Display & Box Model
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  height: fit-content;
  border-radius: ${props => props.theme.radius};

  // Color
  color: white;

  // Text
  text-decoration: none;

  // Other
  cursor: pointer;

  // Pseudo-classes
  &:hover {
    ${props => props.theme.highlight}
  }

  // Media queries
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius} ${props => props.theme.radius} 0 0;
  width: 100%;
`
const TextContainer = styled.div`
  padding: ${props => props.theme.space.large};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
  background: ${props => props.theme.color.secondary};
`
const ShowSeason = styled.p`
  margin: ${props => props.theme.space.medium} 0;
`
const ShowInfo = styled.p`
  font-weight: 300;
`

// Export
export default EpisodePostSingle