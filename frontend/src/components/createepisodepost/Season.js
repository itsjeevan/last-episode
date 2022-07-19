// Import
import axios from 'axios'
import notfound from './404.jpg'
import { onLoad } from '../../utils/helper'
import styled from 'styled-components'

// Individual season
const Season = ({
  scrollToSeasons, seasons, imageLoadCount,
  showSelected, season, setSeasonSelected, setEpisodes }) => {

  // Get episodes of selected season
  const handleOnClickSeason = async season => {
    const seasonResult = await axios.get(`https://api.themoviedb.org/3/tv/${showSelected.id}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodes(seasonResult.data.episodes)
    setSeasonSelected(season)
  }

  return (
    <Container onClick={() => handleOnClickSeason(season)}>
      <Image
        // Increment imageLoadCount, if final image loaded, scroll
        onLoad={() => onLoad(imageLoadCount, seasons.length, scrollToSeasons)}
        alt=""
        src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = notfound
        }}
      />
      <Text>Season {season.season_number}</Text>
    </Container>
  )
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
    box-shadow: 0px 0px 10px 5px ${props => props.theme.color.tertiary};
  }
`
const Text = styled.p`
  text-align: center;
`

// Export
export default Season