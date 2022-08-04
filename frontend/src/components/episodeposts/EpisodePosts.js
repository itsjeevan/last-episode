// Imports
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import notfound from '../../assets/404.jpg'
import { useState } from 'react'

// List of episode posts
const EpisodePosts = ({ episodePosts, filteredEpisodePosts, setFilteredEpisodePosts }) => {

  const [showInput, setShowInput] = useState('')
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  const handleOnClickShowFilter = () => {
    if (showInput === '') {
      setFilteredEpisodePosts(episodePosts)
    }
    else {
      setFilteredEpisodePosts(filteredEpisodePosts.filter(episodePost => {
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
      <Filter>
        <input value={showInput} onChange={handleOnChangeShowInput} type="text" placeholder="Filter by show name..." />
        <button onClick={handleOnClickShowFilter} type="submit">Filter</button>
        <button onClick={handleOnClickClear}>Clear</button>
      </Filter>
      <Container>
        {filteredEpisodePosts.map(episodePost => (
          <SubContainer to={`/episodepost/${episodePost.id}`} key={episodePost.id}>
            <Image
              alt={episodePost.showName}
              src={`https://image.tmdb.org/t/p/w500/${episodePost.episodeImage}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = notfound
              }}
            />
            <TextContainer>
              <ShowName>{episodePost.showName}</ShowName>
              <ShowSeason>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}</ShowSeason>
              <ShowInfo>{episodePost.episodeInfo
                ? episodePost.episodeInfo
                : 'No episode info found.'
              }</ShowInfo>
            </TextContainer>
          </SubContainer>
        )).reverse()}
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
const SubContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  height: fit-content;
  border-radius: ${props => props.theme.radius};
  cursor: pointer;
  color: white;
  text-decoration: none;
  &:hover {
    ${props => props.theme.highlight}
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius} ${props => props.theme.radius} 0 0;
  width: 100%;
`
const TextContainer = styled.div`
  padding: ${props => props.theme.space.large};
  background: ${props => props.theme.color.secondary};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
`
const ShowName = styled.p`
  font-size: 40px;
`
const ShowSeason = styled.p`
  margin: ${props => props.theme.space.medium} 0;
`
const ShowInfo = styled.p`
  font-weight: 300;
`
const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.space.large};
  gap: ${props => props.theme.space.medium};
`

// Export
export default EpisodePosts