// Import
import Episode from './Episode'
import { useRef, useEffect } from 'react'

// List of episodes
const Episodes = ({ showSelected, seasonSelected, episodes, episodePosts, setEpisodePosts }) => {

  // Scroll to seasons section
  const episodesRef = useRef()
  const scrollToEpisodes = () => episodesRef.current.scrollIntoView({ behavior: 'smooth' })

  // Number of images loaded
  const imageLoadCount = useRef(0)
  // Reset count for number of images loaded
  useEffect(() => {
    imageLoadCount.current = 0
  }, [episodes])

  return (
    <div>
      <h1 ref={episodesRef}>Episodes</h1>
      {episodes.map(episode => (
        <Episode
          key={episode.id}
          showSelected={showSelected}
          seasonSelected={seasonSelected}
          episode={episode}
          episodePosts={episodePosts}
          setEpisodePosts={setEpisodePosts}
          imageLoadCount={imageLoadCount}
          episodes={episodes}
          scrollToEpisodes={scrollToEpisodes}
        />
      ))}
    </div>
  )
}

// Export
export default Episodes