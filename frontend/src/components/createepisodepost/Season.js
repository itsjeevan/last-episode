// Import
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import { onLoad } from '../../utils/helper'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Individual season
const Season = ({
  season,
  scrollToSeasons, seasons, imageLoadCount,
  onClickSeason, activeSeason }) => (

  <Container onClick={() => onClickSeason(season)}>
    <Image
      className={activeSeason === season.id ? 'highlight' : ''}
      // Increment imageLoadCount, if final image loaded, scroll
      onLoad={() => onLoad(imageLoadCount, seasons.length, scrollToSeasons)}
      alt={season.name}
      src={season.poster_path
        ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
        : notFoundShowAndSeason
      }
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundShowAndSeason
      }}
    />
    <SeasonNumber>{season.name}</SeasonNumber>
  </Container>
)

// PropTypes
Season.propTypes = {
  onClickSeason: PropTypes.func.isRequired,
  activeSeason: PropTypes.number,
  scrollToSeasons: PropTypes.func.isRequired,
  seasons: PropTypes.array.isRequired,
  imageLoadCount: PropTypes.object.isRequired,
  season: PropTypes.object.isRequired
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(25% - 30px);
  cursor: pointer;
  gap: ${props => props.theme.space.medium};
  @media screen and (max-width: 767px) {
    width: calc(50% - 20px);
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Container}:hover & {
    ${props => props.theme.highlight}
  }
`
const SeasonNumber = styled.p`
  text-align: center;
`

// Export
export default Season