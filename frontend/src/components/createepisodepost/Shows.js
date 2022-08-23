// Imports
import { useState } from 'react'
import Show from './Show'
import tvService from '../../services/tv'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// List of shows
const Shows = ({ shows, setShowSelected, setSeasons, setEpisodes }) => {

  // Set active show
  const [activeShow, setActiveShow] = useState()

  // Get seasons of selected show
  const handleOnClickShow = async show => {
    const seasonsResult = await tvService.getSeasons(show.id)
    setSeasons(seasonsResult)
    setShowSelected(show)
    setEpisodes([])
    setActiveShow(show.id)
  }

  return (
    <>
      {shows.length
        ?
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
        : <TextNoResults>No results</TextNoResults>
      }
    </>
  )
}

// PropTypes
Shows.propTypes = {
  shows: PropTypes.array.isRequired,
  setShowSelected: PropTypes.func.isRequired,
  setSeasons: PropTypes.func.isRequired,
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
const TextNoResults = styled.p`
  margin-top: ${props => props.theme.space.large};
  text-align: center;
`

// Export
export default Shows