// Imports
import Season from './Season'
import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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
  const [activeSeason, setActiveSeason] = useState('')

  // Get episodes of selected season
  const handleOnClickSeason = async season => {
    const seasonResult = await axios.get(`https://api.themoviedb.org/3/tv/${showSelected.id}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodes(seasonResult.data.episodes)
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
export default Seasons