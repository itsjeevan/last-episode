// Import
import axios from 'axios'
import styled from 'styled-components'

// Individual show
const Show = ({ show, setShowSelected, setSeasons, setEpisodes }) => {

  // Get seasons of selected show
  const handleOnClickShow = async show => {
    const seasonsResult = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setSeasons(seasonsResult.data.seasons)
    setShowSelected(show)
    setEpisodes([])
  }

  return (
    <Card to='/create' hash='#seasonheading' onClick={() => handleOnClickShow(show)}>
      <Image alt="" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
      <Text>{show.name}</Text>
    </Card>
  )
}

// Styles
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(25% - 30px);
  cursor: pointer;
  gap: 20px;
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Card}:hover & {
    box-shadow: 0px 0px 10px 5px ${props => props.theme.color.tertiary};
  }
`
const Text = styled.p`
  text-align: center;
`

// Export
export default Show