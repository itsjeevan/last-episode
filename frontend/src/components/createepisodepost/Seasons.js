// Import
import Season from './Season'
import { useRef, useEffect } from 'react'

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
    <div>
      <h1 ref={seasonsRef}>Seasons</h1>
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
    </div>
  )
}

// Export
export default Seasons