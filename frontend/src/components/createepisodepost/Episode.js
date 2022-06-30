// Imports
import { useState } from 'react'
import episodePostService from '../../services/episodeposts'
import episodeCommentService from '../../services/episodecomments'

// Individual episode and submitting data to database
const Episode = ({ showSelected, seasonSelected, episode }) => {

  // Comment input (controlled component)
  const [commentInput, setCommentInput] = useState('')
  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  // Store episode selected
  const [episodeSelected, setEpisodeSelected] = useState({})
  const handleOnClickEpisode = async episode => setEpisodeSelected(episode)

  // Form submission event handler
  const handleOnSubmitFormEpisodePost = async (event) => {
    event.preventDefault()
    // Create episode post object
    const episodePost = {
      showName: showSelected.name,
      showImage: showSelected.poster_path,
      seasonNumber: seasonSelected.season_number,
      seasonImage: seasonSelected.poster_path,
      episodeNumber: episodeSelected.episode_number,
      episodeName: episodeSelected.name,
      episodeInfo: episodeSelected.overview,
      episodeImage: episodeSelected.still_path
    }
    // Save episode post
    const episodePostResponse = await episodePostService.create(episodePost)
    // Create episode comment object
    const episodeComment = {
      content: commentInput,
      episodePostId: episodePostResponse.id
    }
    // Save episode comment
    await episodeCommentService.create(episodeComment)
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

// Export
export default Episode