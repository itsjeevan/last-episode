// Imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import episodeCommentService from '../../services/episodecomments'
import notFoundEpisodeLarge from '../../assets/404-episode-large.jpg'
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import PropTypes from 'prop-types'

// Individual episode post
const EpisodePost = ({ episodePost, episodePosts, setEpisodePosts, user, setMessage }) => {

  const navigate = useNavigate()

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
    // Create episode comment object
    const episodeComment = {
      content: commentInput,
      episodePostId: episodePost.id
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
    const newEpisodePost = {
      ...episodePost,
      episodeComments: episodePost.episodeComments.concat(episodeCommentResponse)
    }
    // Update episode posts
    setEpisodePosts(episodePosts.map(post => post.id !== episodePost.id ? post : newEpisodePost))
    setCommentInput('')
  }

  // Parse date object
  const parseDate = dateObject => {
    const date = new Date(dateObject)
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }

  // If directly linking to episode post or on refresh
  if (!episodePost) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <MainImageContainer>
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
        <MainImageOverlay />
      </MainImageContainer>
      <h1>{episodePost.episodeName}</h1>
      <SubContainer>
        <FlexContainer>
          <ShowName>{episodePost.showName}</ShowName>
          <p>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}</p>
          <EpisodeInfo>
            {episodePost.episodeInfo
              ? episodePost.episodeInfo
              : 'No episode info found.'
            }
          </EpisodeInfo>
          <ImageContainers>
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
                alt={`Season ${episodePost.seasonNumber}`}
                src={episodePost.seasonImage
                  ? `https://image.tmdb.org/t/p/w500/${episodePost.seasonImage}`
                  : notFoundShowAndSeason
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = notFoundShowAndSeason
                }}
              />
              <ImageText>Season {episodePost.seasonNumber}</ImageText>
            </ImageContainer>
          </ImageContainers>
        </FlexContainer>
        <FlexContainer>
          <CommentHeading>Comments</CommentHeading>
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
            }).reverse()}
          </Comments>
        </FlexContainer>
      </SubContainer>
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
const MainImageContainer = styled.div`
  position: relative;
`
const MainImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), #282D40);
`
const MainImage = styled.img`
  display: block;
  width: 100%;
`
const SubContainer = styled.div`
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
const ShowName = styled.p`
  font-size: 40px;
`
const EpisodeInfo = styled.p`
  font-weight: 300;
`
const ImageContainers = styled.div`
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
const CommentHeading = styled.p`
  font-size: 40px;
`
const Textarea = styled.textarea`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 20px;
  padding: ${props => props.theme.space.medium};
  margin-bottom: ${props => props.theme.space.medium};
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

// Export
export default EpisodePost