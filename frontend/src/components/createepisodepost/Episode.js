// Imports
import { useState } from 'react'
import episodePostService from '../../services/episodeposts'
import episodeCommentService from '../../services/episodecomments'
import { useNavigate } from 'react-router-dom'
import notfound from '../../assets/404.jpg'
import { onLoad } from '../../utils/helper'
import styled from 'styled-components/macro'

// Individual episode and submitting data to database
const Episode = ({
  episodeSelected, onClickEpisode, activeEpisode,
  scrollToEpisodes, episodes, imageLoadCount,
  showSelected, seasonSelected, episode, episodePosts, setEpisodePosts }) => {

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
    navigate(`/${episodePostResponseFinal.id}`)
  }

  return (
    <Container>
      <SubContainer onClick={() => onClickEpisode(episode)} className={activeEpisode === episode.id ? 'highlight' : ''}>
        <Image
          onLoad={() => onLoad(imageLoadCount, episodes.length, scrollToEpisodes)}
          alt={`Episode ${episode.episode_number}`}
          src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = notfound
          }}
        />
        <TextContainer className={activeEpisode === episode.id ? 'remove-radius' : ''}>
          <EpisodeNumber>{episode.episode_number}. {episode.name}</EpisodeNumber>
          <Text>
            {episode.overview === ''
              ? 'No episode info found.'
              : episode.overview
            }
          </Text>
        </TextContainer>
        <Form >
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
      {activeEpisode === episode.id ? <Button type="submit" onClick={handleOnSubmitFormEpisodePost}>Post</Button> : null}
    </Container>
  )
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 30px);
  cursor: pointer;
`
const SubContainer = styled.div`
  border-radius: ${props => props.theme.radius};
  &:hover {
    ${props => props.theme.highlight}
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius} ${props => props.theme.radius} 0 0;
  width: 100%;
  display: block; // To remove random space around image
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  `
const EpisodeNumber = styled.p`
  font-size: 40px;
  margin-bottom: ${props => props.theme.space.medium}
  `
const TextContainer = styled.div`
  background: ${props => props.theme.color.secondary};
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
  padding: ${props => props.theme.space.large};
`
const Text = styled.p`
  font-weight: 300;
  `
const Textbox = styled.textarea`
  border-radius: 0 0 ${props => props.theme.radius} ${props => props.theme.radius};
  width: 100%;
  height: 100px;
  font-size: 20px;
  resize: none;
  padding: ${props => props.theme.space.medium};
  // margin: ${props => props.theme.space.medium} 0 ${props => props.theme.space.medium} 0;
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