import { useState } from 'react'
import axios from 'axios'

const Episode = ({
  episode,
  showId,
  showName,
  showImage,
  seasonId,
  seasonNumber,
  seasonImage
}) => {

  const [commentInput, setCommentInput] = useState('')

  const [episodeId, setEpisodeId] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState('')
  const [episodeName, setEpisodeName] = useState('')
  const [episodeInfo, setEpisodeInfo] = useState('')
  const [episodeImage, setEpisodeImage] = useState('')

  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  const handleOnClickEpisode = async (episode) => {
    setEpisodeId(episode.id)
    setEpisodeNumber(episode.episode_number)
    setEpisodeName(episode.name)
    setEpisodeInfo(episode.overview)
    setEpisodeImage(episode.still_path)
  }

  const handleOnSubmitFormEpisodePost = async (event) => {
    event.preventDefault()
    const episodePost = {
      showId, showName, showImage,
      seasonId, seasonNumber, seasonImage,
      episodeId, episodeNumber, episodeName, episodeInfo, episodeImage,
      userId: "62b35a856e7a5a86e3652fc0"
    }
    const responseEpisodePost = await axios.post('http://localhost:3001/api/episodeposts', episodePost)
    const episodeComment = {
      content: commentInput,
      userId: "62b35a856e7a5a86e3652fc0",
      episodePostId: responseEpisodePost.data.id
    }
    const responseComment = await axios.post('http://localhost:3001/api/episodecomments', episodeComment)
    console.log('submitted episode post')
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