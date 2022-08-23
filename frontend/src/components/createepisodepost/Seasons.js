// Imports
import { useRef, useEffect, useState } from 'react'
import Season from './Season'
import styled from 'styled-components'
import tvService from '../../services/tv'
import PropTypes from 'prop-types'

// List of seasons
const Seasons = ({ showSelected, seasons, setSeasonSelected, setEpisodes }) => {

  // Scroll to seasons section
  const seasonsRef = useRef()
  const scrollToSeasons = () => seasonsRef.current.scrollIntoView({ behavior: 'smooth' })

  // Number of images loaded
  const imageLoadCount = useRef(0)
  // Reset count for number of images loaded
  useEffect(() => {
    imageLoadCount.current = 0
  }, [seasons])

  // Set active
  const [activeSeason, setActiveSeason] = useState()

  // Get episodes of selected season
  const handleOnClickSeason = async season => {
    const seasonResult = await tvService.getEpisodes(showSelected.id, season.season_number)
    setEpisodes(seasonResult)
    setSeasonSelected(season)
    setActiveSeason(season.id)
  }

  return (
    <>
      <Heading ref={seasonsRef}>Seasons</Heading>
      <Container>
        {seasons.map(season => (
          <Season
            key={season.id}
            showSelected={showSelected}
            season={season}
            setSeasonSelected={setSeasonSelected}
            setEpisodes={setEpisodes}
            imageLoadCount={imageLoadCount}
            seasons={seasons}
            scrollToSeasons={scrollToSeasons}
            onClickSeason={handleOnClickSeason}
            activeSeason={activeSeason}
          />
        ))}
      </Container>
    </>
  )
}

// PropTypes
Seasons.propTypes = {
  showSelected: PropTypes.object.isRequired,
  seasons: PropTypes.array.isRequired,
  setSeasonSelected: PropTypes.func.isRequired,
  setEpisodes: PropTypes.func.isRequired
}

// Styles
const Heading = styled.h1`
  margin: ${props => props.theme.space.large} 0;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.large};
`

// Export
export default Seasons