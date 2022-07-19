// Imports
import Show from './Show'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'

// List of shows
const Shows = ({ shows, setShowSelected, setSeasons, setEpisodes }) => {

  // Set active show
  const [activeShow, setActiveShow] = useState('')

  // Get seasons of selected show
  const handleOnClickShow = async show => {
    const seasonsResult = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setSeasons(seasonsResult.data.seasons)
    setShowSelected(show)
    setEpisodes([])
    setActiveShow(show.id)
  }

  return (
    <>
      <Heading>Shows</Heading>
      <Container>
        {shows.map(show => (
          <Show
            key={show.id}
            show={show}
            setShowSelected={setShowSelected}
            setSeasons={setSeasons}
            setEpisodes={setEpisodes}
            onClickShow={handleOnClickShow}
            activeShow={activeShow}
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
export default Shows