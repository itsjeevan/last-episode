// Imports
import { useState, useEffect } from 'react'
import EpisodePostSingle from './EpisodePostSingle'
import styled from 'styled-components'

// List of episode posts
const EpisodePosts = ({ episodePosts, filteredEpisodePosts, setFilteredEpisodePosts }) => {

  // Avoid showing filtered results when leaving page and returning
  useEffect(() => {
    setFilteredEpisodePosts(episodePosts)
  }, [])

  // Filter input (controlled component)
  const [showInput, setShowInput] = useState('')
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  // Filter submission event handler
  const handleOnSubmitShowFilter = event => {
    event.preventDefault()
    if (showInput === '') {
      setFilteredEpisodePosts(episodePosts)
    }
    else {
      setFilteredEpisodePosts(episodePosts.filter(episodePost => {
        console.log('showname:', episodePost.showName)
        return episodePost.showName.toLowerCase().includes(showInput.toLowerCase())
      }))
    }
  }

  // Reset filter field
  const handleOnClickClear = () => {
    setFilteredEpisodePosts(episodePosts)
    setShowInput('')
  }

  return (
    <>
      <FilterForm onSubmit={handleOnSubmitShowFilter}>
        <FilterInput
          value={showInput}
          onChange={handleOnChangeShowInput}
          type="text"
          placeholder="Filter by show name..."
        />
        <FilterButtons>
          <button type="submit">Filter</button>
          <button onClick={handleOnClickClear}>Clear</button>
        </FilterButtons>
      </FilterForm>
      <Container>
        {
          filteredEpisodePosts.length
            ? filteredEpisodePosts.map(episodePost => (
              <EpisodePostSingle key={episodePost.id} episodePost={episodePost} />
            ))
            : <TextNoResults>No results</TextNoResults>
        }
      </Container>
    </>
  )
}

// Styles
const FilterForm = styled.form`
  // Display & Box Model
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.medium};
  margin-bottom: ${props => props.theme.space.large};
  flex-wrap: wrap;

  // Media queries
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`
const FilterInput = styled.input`
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const FilterButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.medium};
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${props => props.theme.space.large};
`
const TextNoResults = styled.p`
  text-align: center;
  width: 100%;
`

// Export
export default EpisodePosts