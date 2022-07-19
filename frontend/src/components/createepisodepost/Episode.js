// Imports
import { useState } from 'react'
import episodePostService from '../../services/episodeposts'
import episodeCommentService from '../../services/episodecomments'
import { useNavigate } from 'react-router-dom'
import notfound from './404.jpg'
import { onLoad } from '../../utils/helper'
import styled from 'styled-components'

// Individual episode and submitting data to database
const Episode = ({
  scrollToEpisodes, episodes, imageLoadCount,
  showSelected, seasonSelected, episode, episodePosts, setEpisodePosts }) => {

  const navigate = useNavigate()

  // Comment input (controlled component)
  const [commentInput, setCommentInput] = useState('')
  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  // Store episode selected
  const [episodeSelected, setEpisodeSelected] = useState({})
  const handleOnClickEpisode = async episode => {
    setEpisodeSelected(episode)
    setVisibility(!visibility)
  }

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
    const episodePostResponseFinal = await episodePostService.getOne(episodePostResponse.id)
    setEpisodePosts(episodePosts.concat(episodePostResponseFinal))
    navigate('/')
  }

  // Toggle visibility of form
  const [visibility, setVisibility] = useState(false)

  return (
    <>
      <Container>
        <div onClick={() => handleOnClickEpisode(episode)}>
          <Image
            onLoad={() => onLoad(imageLoadCount, episodes.length, scrollToEpisodes)}
            alt=""
            src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = notfound
            }}
          />
          {episode.episode_number}. {episode.name}
          <Text>{episode.overview}</Text>
        </div>
        <Form onSubmit={handleOnSubmitFormEpisodePost}>
          {visibility
            ? <>
              <Textbox
                value={commentInput}
                onChange={handleOnChangeCommentInput}
                placeholder="Write a comment..."
              />
              <button type="submit">Post</button>
            </>
            : null
          }
        </Form>
      </Container>
    </>
  )
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 30px);
  cursor: pointer;
  gap: 20px;
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Container}:hover & {
    box-shadow: 0px 0px 10px 5px ${props => props.theme.color.tertiary};
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Text = styled.p`
  // text-align: center;
`
const Textbox = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  margin-bottom: 20px;
`

// Export
export default Episode