// Imports
import episodeCommentService from '../../services/episodecomments'
import { useState } from 'react'

// Individual episode post
const EpisodePost = ({ episodePost }) => {

  // If directly linking to episode post or on refresh
  if (!episodePost) {
    return (
      <h1>Loading</h1>
    )
  }

  // Base url for images
  const baseUrl = 'https://image.tmdb.org/t/p/w500'

  // Comment input (controlled component)
  const [commentInput, setCommentInput] = useState('')
  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  const [episodeComments, setEpisodeComments] = useState(episodePost.episodeComments)



  const handleOnSubmitCommentForm = async event => {
    event.preventDefault()
    // Create episode comment object
    const episodeComment = {
      content: commentInput,
      episodePostId: episodePost.id
    }
    // Save episode comment
    const episodeCommentResponse = await episodeCommentService.create(episodeComment)
    setCommentInput('')
    setEpisodeComments(episodeComments.concat(episodeCommentResponse))
  }

  return (
    <>
      <h1>Show: {episodePost.showName}</h1>
      <img width="75" alt="" src={`${baseUrl}/${episodePost.showImage}`} />
      <h2>Season: {episodePost.seasonNumber}</h2>
      <img width="75" alt="" src={`${baseUrl}/${episodePost.seasonImage}`} />
      <h3>Episode: {episodePost.episodeNumber}</h3>
      <img width="75" alt="" src={`${baseUrl}/${episodePost.episodeImage}`} />
      <h1>{episodePost.episodeName}</h1>
      <p>{episodePost.episodeInfo}</p>
      <h2>Comments</h2>
      <form onSubmit={handleOnSubmitCommentForm}>
        <input value={commentInput} onChange={handleOnChangeCommentInput} />
        <button type="submit">post</button>
      </form>
      {episodeComments.map(comment => {
        return (
          <div key={comment.id} style={{ border: '1px solid lightgray' }}>
            <p>{comment.content}</p>
            <p>{comment.date}</p>
            <p>posted by {comment.user}</p>
          </div>
        )
      })}
    </>
  )


}

// Export
export default EpisodePost