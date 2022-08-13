// Imports
import styled from 'styled-components'
import { useState } from 'react'
import EpisodePostSingle from './EpisodePostSingle'

// List of episode posts
const EpisodePosts = ({ episodePosts, filteredEpisodePosts, setFilteredEpisodePosts }) => {

  const [showInput, setShowInput] = useState('')
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  const handleOnSubmitShowFilter = event => {
    event.preventDefault()
    if (showInput === '') {
      setFilteredEpisodePosts(episodePosts)
    }
    else {
      setFilteredEpisodePosts(episodePosts.filter(episodePost => {
        return episodePost.showName.toLowerCase().includes(showInput.toLowerCase())
      }))
    }
  }

  const handleOnClickClear = () => {
    setFilteredEpisodePosts(episodePosts)
    setShowInput('')
  }

  return (
    <>
      <FilterForm onSubmit={handleOnSubmitShowFilter}>
        <FilterInput value={showInput} onChange={handleOnChangeShowInput} type="text" placeholder="Filter by show name..." />
        <FilterButtons>
          <button type="submit">Filter</button>
          <button onClick={handleOnClickClear}>Clear</button>
        </FilterButtons>
      </FilterForm>
      <Container>
        {
          filteredEpisodePosts.length !== 0
            ? filteredEpisodePosts.map(episodePost => (
              <EpisodePostSingle key={episodePost.id} episodePost={episodePost} />
            )).reverse()
            : <Text>No results</Text>
        }
      </Container>
    </>
  )
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
`
const FilterForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.medium};
  margin-bottom: ${props => props.theme.space.large};
  flex-wrap: wrap;
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
  gap: 20px;
`
const Text = styled.p`
  text-align: center;
  width: 100%;
`

// Export
export default EpisodePosts