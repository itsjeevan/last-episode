// Imports
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notFoundEpisodeSmall from '../../assets/404-episode-small.jpg'

const EpisodePostSingle = ({ episodePost }) => (
  <SubContainer to={`/episodepost/${episodePost.id}`} key={episodePost.id}>
    <Image
      alt={episodePost.showName}
      src={`https://image.tmdb.org/t/p/w500/${episodePost.episodeImage}`}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundEpisodeSmall
      }}
    />
    <TextContainer>
      <ShowName>{episodePost.showName}</ShowName>
      <ShowSeason>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}</ShowSeason>
      <ShowInfo>{episodePost.episodeInfo
        ? episodePost.episodeInfo
        : 'No episode info found.'
      }</ShowInfo>
    </TextContainer>
  </SubContainer>
)

// Styles
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
export default EpisodePostSingle