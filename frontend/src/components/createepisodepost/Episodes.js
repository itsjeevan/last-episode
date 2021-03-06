// Import
import Episode from './Episode'
import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

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

  // Set active
  const [activeEpisode, setActiveEpisode] = useState('')

  // Store episode selected
  const [episodeSelected, setEpisodeSelected] = useState({})
  const handleOnClickEpisode = async episode => {
    setEpisodeSelected(episode)
    setActiveEpisode(episode.id)
  }

  return (
    <div>
      <Heading ref={episodesRef}>Episodes</Heading>
      <Container>
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
            episodeSelected={episodeSelected}
            onClickEpisode={handleOnClickEpisode}
            activeEpisode={activeEpisode}
          />
        ))}
      </Container>
    </div>
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
export default Episodes