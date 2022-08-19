// Import
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import { onLoad } from '../../utils/helper'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Individual season
const Season = ({
  onClickSeason, activeSeason,
  scrollToSeasons, seasons, imageLoadCount,
  season }) => (
  <Container onClick={() => onClickSeason(season)}>
    <Image
      className={activeSeason === season.id ? 'highlight' : ''}
      // Increment imageLoadCount, if final image loaded, scroll
      onLoad={() => onLoad(imageLoadCount, seasons.length, scrollToSeasons)}
      alt={`Season ${season.season_number}`}
      src={season.poster_path
        ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
        : notFoundShowAndSeason
      }
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundShowAndSeason
      }}
    />
    <Text>Season {season.season_number}</Text>
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
  gap: 20px;
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Container}:hover & {
    ${props => props.theme.highlight}
  }
`
const Text = styled.p`
  text-align: center;
`

// Export
export default Season