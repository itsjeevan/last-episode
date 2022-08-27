// Imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import episodeCommentService from '../../services/episodecomments'
import episodePostService from '../../services/episodeposts'
import notFoundEpisodeLarge from '../../assets/404-episode-large.jpg'
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import PropTypes from 'prop-types'

// Individual episode post
const EpisodePost = ({
  episodePostMatch, user, setMessage, setEpisodePostsCommented }) => {

  const navigate = useNavigate()

  const [episodePost, setEpisodePost] = useState()

  // On initial render
  useEffect(() => {
    // If directly loading an episode post
    if (episodePostMatch) {
      // Get episode post
      episodePostService.getOne(episodePostMatch.id)
        .then(response => {
          setEpisodePost(response)
        })
    }
  }, [episodePostMatch])

  // Comment input (controlled component)
  const [commentInput, setCommentInput] = useState('')
  const handleOnChangeCommentInput = event => setCommentInput(event.target.value)

  // Comment form event handler
  const handleOnSubmitCommentForm = async event => {
    event.preventDefault()
    // Redirect if not logged in
    if (!user) {
      navigate('/login')
      return
    }
    // Validation: Frontend
    if (!commentInput) {
      setMessage('Error: Comment field empty')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (commentInput.length >= 500) {
      setMessage('Error: Comment too long')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Create episode comment object
    const episodeComment = {
      content: commentInput,
      episodePostId: episodePostMatch.id
    }
    // Save episode comment
    try {
      var episodeCommentResponse = await episodeCommentService.create(episodeComment)
    }
    // Validation: Backend
    catch(exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Create new episode post with new comment
    const updatedEpisodePost = {
      ...episodePost,
      episodeComments: [episodeCommentResponse, ...episodePost.episodeComments]
    }
    // Update episode post
    setEpisodePost(updatedEpisodePost)
    setCommentInput('')
    setEpisodePostsCommented(prevState => {
      const foundEpisodePost = prevState.some(episodePostCommented => episodePostCommented.id === episodePostMatch.id)
      if (!foundEpisodePost) {
        return [episodePostMatch, ...prevState]
      }
      return prevState
    })
  }

  // Parse date object
  const parseDate = dateObject => {
    const date = new Date(dateObject)
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }

  // If directly linking to episode post or on refresh
  if (!episodePostMatch || !episodePost) {
    return (
      <LoadingText>Loading...</LoadingText>
    )
  }

  return (
    <>
      <MainImage
        alt={`Episode ${episodePost.episodeNumber}`}
        src={episodePost.episodeImage
          ? `https://image.tmdb.org/t/p/original/${episodePost.episodeImage}`
          : notFoundEpisodeLarge
        }
        onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src = notFoundEpisodeLarge
        }}
      />
      <EpisodeName>{episodePost.episodeName}</EpisodeName>
      <Container>
        <FlexContainer>
          <h2>{episodePost.showName}</h2>
          <p>{episodePost.seasonName} Episode {episodePost.episodeNumber}</p>
          <EpisodeInfo>
            {episodePost.episodeInfo
              ? episodePost.episodeInfo
              : 'No episode info found.'
            }
          </EpisodeInfo>
          <ImagesContainer>
            <ImageContainer>
              <Image
                alt={episodePost.showName}
                src={episodePost.showImage
                  ? `https://image.tmdb.org/t/p/w500/${episodePost.showImage}`
                  : notFoundShowAndSeason
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = notFoundShowAndSeason
                }}
              />
              <ImageText>{episodePost.showName}</ImageText>
            </ImageContainer>
            <ImageContainer>
              <Image
                alt={episodePost.seasonName}
                src={episodePost.seasonImage
                  ? `https://image.tmdb.org/t/p/w500/${episodePost.seasonImage}`
                  : notFoundShowAndSeason
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = notFoundShowAndSeason
                }}
              />
              <ImageText>{episodePost.seasonName}</ImageText>
            </ImageContainer>
          </ImagesContainer>
        </FlexContainer>
        <FlexContainer>
          <h2>Comments</h2>
          <form onSubmit={handleOnSubmitCommentForm}>
            <Textarea
              value={commentInput}
              onChange={handleOnChangeCommentInput}
              placeholder="Write a comment..."
            />
            <Button type="submit">Post Comment</Button>
          </form>
          <Comments>
            {episodePost.episodeComments.map(comment => {
              return (
                <Comment key={comment.id}>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentInfo>
                    <User>{comment.user.username}</User>
                    <DatePosted>{parseDate(comment.date)}</DatePosted>
                  </CommentInfo>
                </Comment>
              )
            })}
          </Comments>
        </FlexContainer>
      </Container>
    </>
  )
}

// PropTypes
EpisodePost.propTypes = {
  episodePost: PropTypes.object,
  episodePosts: PropTypes.array.isRequired,
  setEpisodePosts: PropTypes.func.isRequired,
  user: PropTypes.object,
  setMessage: PropTypes.func.isRequired
}

// Styles
const EpisodeName = styled.h1`
  margin-top: ${props => props.theme.space.large};
`
const MainImage = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.space.large};
  flex-wrap: wrap;
  margin-top: ${props => props.theme.space.large};
`
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
  gap: ${props => props.theme.space.large};
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
const EpisodeInfo = styled.p`
  font-weight: 300;
`
const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.space.medium};
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px);
  gap: ${props => props.theme.space.medium};
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
`
const ImageText = styled.p`
  text-align: center;
`
const Textarea = styled.textarea`
  // Display & Box Model
  border-radius: ${props => props.theme.radius};
  width: 100%;
  height: 100px;
  padding: ${props => props.theme.space.medium};
  margin-bottom: ${props => props.theme.space.medium};
  resize: none;

  // Text
  font-size: 20px;

  // Pseudo-classes
  &:focus {
    outline-color: ${props => props.theme.color.tertiary};
  }
`
const Button = styled.button`
  margin-left: auto;
`
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space.medium};
`
const Comment = styled.div`
  background: ${props => props.theme.color.secondary};
  padding: ${props => props.theme.space.large};
  border-radius: ${props => props.theme.radius};
`
const CommentContent = styled.p`
  font-weight: 300;
  margin-bottom: ${props => props.theme.space.medium};
`
const CommentInfo = styled.div`
  display: flex;
  flex-direction: row;
`
const DatePosted = styled.p`
  font-size: 16px;
  font-weight: 300;
`
const User = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-right: ${props => props.theme.space.small};
`
const LoadingText = styled.p`
  text-align: center;
`

// Export
export default EpisodePost