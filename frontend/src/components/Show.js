import axios from 'axios'

const Show = ({
  show,
  setEpisodes,
  setSeasons,
  setShowId,
  setShowName,
  setShowImage
}) => {

  const handleOnClickShow = async (show) => {
    const seasons = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodes([])
    setSeasons(seasons.data.seasons)
    setShowId(show.id)
    setShowName(show.name)
    setShowImage(show.poster_path)
  }

  return (
    <div onClick={() => handleOnClickShow(show)}>
      {show.name}
      <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
    </div>
  )
}

export default Show