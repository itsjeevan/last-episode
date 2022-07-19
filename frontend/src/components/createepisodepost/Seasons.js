// Import
import Season from './Season'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'

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