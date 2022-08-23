// Import
import { useRef, useEffect, useState } from 'react'
import Episode from './Episode'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// List of episodes
const Episodes = ({ showSelected, seasonSelected, episodes, episodePosts, setEpisodePosts, setFilteredEpisodePosts, setMessage }) => {

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
  const [activeEpisode, setActiveEpisode] = useState()

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
            setFilteredEpisodePosts={setFilteredEpisodePosts}
            imageLoadCount={imageLoadCount}
            episodes={episodes}
            scrollToEpisodes={scrollToEpisodes}
            episodeSelected={episodeSelected}
            onClickEpisode={handleOnClickEpisode}
            activeEpisode={activeEpisode}
            setMessage={setMessage}
          />
        ))}
      </Container>
    </div>
  )
}

// PropTypes
Episodes.propTypes = {
  showSelected: PropTypes.object.isRequired,
  seasonSelected: PropTypes.object.isRequired,
  episodes: PropTypes.array.isRequired,
  episodePosts: PropTypes.array.isRequired,
  setEpisodePosts: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
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
export default Episodes