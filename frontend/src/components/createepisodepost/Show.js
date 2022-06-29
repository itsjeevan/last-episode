// Import
import axios from 'axios'

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
    <div onClick={() => handleOnClickShow(show)}>
      {show.name}
      <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
    </div>
  )
}

// Export
export default Show