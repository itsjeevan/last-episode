// Imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onLoad } from '../../utils/helper'
import episodePostService from '../../services/episodeposts'
import episodeCommentService from '../../services/episodecomments'
import notFoundEpisodeSmall from '../../assets/404-episode-small.jpg'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Individual episode and submitting data to database
const Episode = ({
  episodeSelected, onClickEpisode, activeEpisode,
  scrollToEpisodes, episodes, imageLoadCount,
  showSelected, seasonSelected, episode, episodePosts, setEpisodePosts, setFilteredEpisodePosts,
  setMessage }) => {

  const navigate = useNavigate()

  // Comment input (controlled component)
  const [commentInput, setCommentInput] = useState('')
  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  // Form submission event handler
  const handleOnSubmitFormEpisodePost = async (event) => {
    event.preventDefault()
    // Create episode post object
    const episodePost = {
      showName: showSelected.name,
      showImage: showSelected.poster_path,
      seasonName: seasonSelected.name,
      seasonImage: seasonSelected.poster_path,
      episodeNumber: episodeSelected.episode_number,
      episodeName: episodeSelected.name,
      episodeInfo: episodeSelected.overview,
      episodeImage: episodeSelected.still_path
    }
    // Validation: Frontend
    if (!episodePost.showName ||
      !episodePost.seasonName ||
      !episodePost.episodeNumber ||
      !episodePost.episodeName) {
      setMessage('Error: Could not create episode post')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (!commentInput) {
      setMessage('Error: Comment required')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (commentInput.length >= 500) {
      setMessage('Error: Comment too long')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Save episode post
    try {
      var episodePostResponse = await episodePostService.create(episodePost)
    }
    // Validation: Backend
    catch(exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Create episode comment object
    const episodeComment = {
      content: commentInput,
      episodePostId: episodePostResponse.id
    }
    // Save episode comment
    try {
      await episodeCommentService.create(episodeComment)
      var episodePostResponseFinal = await episodePostService.getOne(episodePostResponse.id)
    }
    // Validation: Backend
    catch(exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 2000)
      return
    }
    setEpisodePosts([episodePostResponseFinal, ...episodePosts])
    setFilteredEpisodePosts([episodePostResponseFinal, ...episodePosts])
    navigate(`/episodepost/${episodePostResponseFinal.id}`)
  }

  return (
    <Container>
      <SubContainer onClick={() => onClickEpisode(episode)} className={activeEpisode === episode.id ? 'highlight' : ''}>
        <Image
          onLoad={() => onLoad(imageLoadCount, episodes.length, scrollToEpisodes)}
          alt={`Episode ${episode.episode_number}`}
          src={episode.still_path
            ? `https://image.tmdb.org/t/p/w500/${episode.still_path}`
            : notFoundEpisodeSmall
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = notFoundEpisodeSmall
          }}
        />
        <TextContainer className={activeEpisode === episode.id ? 'remove-radius' : ''}>
          <EpisodeNumber>{episode.episode_number}. {episode.name}</EpisodeNumber>
          <EpisodeInfo>
            {episode.overview === ''
              ? 'No episode info found.'
              : episode.overview
            }
          </EpisodeInfo>
        </TextContainer>
        <Form>
          {activeEpisode === episode.id
            ? <>
              <Textbox
                value={commentInput}
                onChange={handleOnChangeCommentInput}
                placeholder="Write a comment..."
              />
            </>
            : null
          }
        </Form>
      </SubContainer>
      {activeEpisode === episode.id
        ? <Button type="submit" onClick={handleOnSubmitFormEpisodePost}>Post</Button>
        : null
      }
    </Container>
  )
}

// PropTypes
Episode.propTypes = {
  episodeSelected: PropTypes.object.isRequired,
  onClickEpisode: PropTypes.func.isRequired,
  activeEpisode: PropTypes.number,
  scrollToEpisodes: PropTypes.func.isRequired,
  episodes: PropTypes.array.isRequired,
  imageLoadCount: PropTypes.object.isRequired,
  showSelected: PropTypes.object.isRequired,
  seasonSelected: PropTypes.object.isRequired,
  episode: PropTypes.object.isRequired,
  episodePosts: PropTypes.array.isRequired,
  setEpisodePosts: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 30px);
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const SubContainer = styled.div`
  border-radius: ${props => props.theme.radius};
  &:hover {
    ${props => props.theme.highlight}
  }
`
const Image = styled.img`
  display: block; // To remove space around image
  border-radius: ${props => props.theme.radius} ${props => props.theme.radius} 0 0;
  width: 100%;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const EpisodeNumber = styled.h2`
  margin-bottom: ${props => props.theme.space.medium}
`
const TextContainer = styled.div`
  background: ${props => props.theme.color.secondary};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
  padding: ${props => props.theme.space.large};
`
const EpisodeInfo = styled.p`
  font-weight: 300;
`
const Textbox = styled.textarea`
  // Display & Box Model
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
  width: 100%;
  height: 100px;
  padding: ${props => props.theme.space.medium};
  resize: none;

  // Text
  font-size: 20px;

  // Pseudo-classes
  &:focus {
    outline-color: ${props => props.theme.color.tertiary};
  }
`
const Button = styled.button`
  margin-top: ${props => props.theme.space.medium};
  width: fit-content;
  margin-left: auto;
`

// Export
export default Episode