import { useState } from 'react'
import axios from 'axios'

const Episode = ({ showSelected, seasonSelected, episode }) => {

  const [commentInput, setCommentInput] = useState('')
  const [episodeSelected, setEpisodeSelected] = useState({})

  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)
  const handleOnClickEpisode = async episode => setEpisodeSelected(episode)

  const handleOnSubmitFormEpisodePost = async (event) => {
    event.preventDefault()
    const episodePost = {
      showName: showSelected.name,
      showImage: showSelected.poster_path,
      seasonNumber: seasonSelected.season_number,
      seasonImage: seasonSelected.poster_path,
      episodeNumber: episodeSelected.episode_number,
      episodeName: episodeSelected.name,
      episodeInfo: episodeSelected.overview,
      episodeImage: episodeSelected.still_path,
      userId: "62b35a856e7a5a86e3652fc0"
    }
    const episodePostResponse = await axios.post('http://localhost:3001/api/episodeposts', episodePost)
    const episodeComment = {
      content: commentInput,
      userId: "62b35a856e7a5a86e3652fc0",
      episodePostId: episodePostResponse.data.id
    }
    await axios.post('http://localhost:3001/api/episodecomments', episodeComment)
  }

  return (
    <div onClick={() => handleOnClickEpisode(episode)}>
      {episode.episode_number}. {episode.name}
      <img width="75" alt="" src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} />
      <p>{episode.overview}</p>
      <form onSubmit={handleOnSubmitFormEpisodePost}>
        <input value={commentInput} onChange={handleOnChangeCommentInput} />
      </form>
    </div>
  )
}
  
export default Episode