import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [showInput, setShowInput] = useState('')
  
  const [showList, setShowList] = useState([])
  const [seasonList, setSeasonList] = useState([])
  const [episodeList, setEpisodeList] = useState([])
  
  const [showId, setShowId] = useState('')
  const [showName, setShowName] = useState('')
  const [showImage, setShowImage] = useState('')
  const [seasonId, setSeasonId] = useState('')
  const [seasonNumber, setSeasonNumber] = useState('')
  const [seasonImage, setSeasonImage] = useState('')
  const [episodeId, setEpisodeId] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState('')
  const [episodeName, setEpisodeName] = useState('')
  const [episodeInfo, setEpisodeInfo] = useState('')
  const [episodeImage, setEpisodeImage] = useState('')
  const [commentInput, setCommentInput] = useState('')
  
  const handleOnSubmitFormShowSearch = async (event) => {
    event.preventDefault()
    const searchResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
    setShowList(searchResult.data.results)
    setSeasonList([])
    setEpisodeList([])
    console.log(searchResult.data)
  }
    
  const handleOnChangeShowInput = event => {
    setShowInput(event.target.value)
  }

  const handleOnClickShow = async (show) => {
    const seasons = await axios.get(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setEpisodeList([])
    setSeasonList(seasons.data.seasons)
    setShowId(show.id)
    setShowName(show.name)
    setShowImage(show.poster_path)
    console.log(seasons.data)
  }
  
  const handleOnClickSeason = async (season) => {
    const seasonDetail = await axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    console.log(seasonDetail.data)
    setEpisodeList(seasonDetail.data.episodes)
    setSeasonId(season.id)
    setSeasonNumber(season.season_number)
    setSeasonImage(season.poster_path)
  }

  const handleOnClickEpisode = async (episode) => {
    setEpisodeId(episode.id)
    setEpisodeNumber(episode.episode_number)
    setEpisodeName(episode.name)
    setEpisodeInfo(episode.overview)
    setEpisodeImage(episode.still_path)
  }

  const handleOnSubmitFormEpisodePost = async (event) => {
    event.preventDefault()
    console.log('submitted episode post')
    const episodePost = {
      showId: showId,
      showName: showName,
      showImage: showImage,
      seasonId: seasonId,
      seasonNumber: seasonNumber,
      seasonImage: seasonImage,
      episodeId: episodeId,
      episodeNumber: episodeNumber,
      episodeName: episodeName,
      episodeInfo: episodeInfo,
      episodeImage: episodeImage,
      userId: "62b35a856e7a5a86e3652fc0"
    }
    const responseEpisodePost = await axios.post('http://localhost:3001/api/episodeposts', episodePost)
    console.log(responseEpisodePost.data)
    const episodeComment = {
      content: commentInput,
      userId: "62b35a856e7a5a86e3652fc0",
      episodePostId: responseEpisodePost.data.id
    }
    const responseComment = await axios.post('http://localhost:3001/api/episodecomments', episodeComment)
    console.log(responseComment.data)
    

  }

  const handleOnChangeCommentInput = event => {
    setCommentInput(event.target.value)
  }

  return (
    <>
      <form onSubmit={handleOnSubmitFormShowSearch}>
        <div>show: <input value={showInput} onChange={handleOnChangeShowInput} /></div>
        <button type="submit">submit</button>
      </form>
      <h1>Shows</h1>
      <ul>
        {showList.map(show => {
          return (
            <li key={show.id} onClick={() => handleOnClickShow(show)}>
              {show.name}
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
            </li>
            )
          })}
      </ul>
      <h1>Seasons</h1>
      <ul>
        {seasonList.map(season => {
          return (
            <li key={season.id} onClick={() => handleOnClickSeason(season)}>
              Season {season.season_number}
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`} />
            </li>
            )
          })}
      </ul>
      <h1>Episodes</h1>
      <ul>
        {episodeList.map(episode => {
          return (
            <li key={episode.id} onClick={() => handleOnClickEpisode(episode)}>
              <div>
                {episode.episode_number}. {episode.name}
              </div>
              <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} />
              <p>{episode.overview}</p>
              <form onSubmit={handleOnSubmitFormEpisodePost}>
                <input value={commentInput} onChange={handleOnChangeCommentInput} />
              </form>
            </li>
            )
          })}
      </ul>
    </>
  )
}

export default App
