// Imports
import episodeCommentService from '../../services/episodecomments'
import { useState } from 'react'
import styled from 'styled-components/macro'

// Individual episode post
const EpisodePost = ({ episodePost }) => {

  // If directly linking to episode post or on refresh
  if (!episodePost) {
    return (
      <h1>Loading</h1>
    )
  }

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

  // Parse date object
  const parseDate = dateObject => {
    const date = new Date(dateObject)
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }

  return (
    <>
      <MainImageContainer>
        <MainImage
          alt=""
          src={`https://image.tmdb.org/t/p/original/${episodePost.episodeImage}`}
        />
        <MainImageOverlay />
      </MainImageContainer>
      <Container>
        <EpisodeName>{episodePost.episodeName}</EpisodeName>
        <SubContainer>
          <FlexContainer>
            <ShowName>{episodePost.showName}</ShowName>
            <EpisodeDetails>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}</EpisodeDetails>
            <EpisodeInfo>{episodePost.episodeInfo}</EpisodeInfo>
            <ImageContainer>
              <Image alt="" src={`https://image.tmdb.org/t/p/w500/${episodePost.showImage}`} />
              <Image alt="" src={`https://image.tmdb.org/t/p/w500/${episodePost.seasonImage}`} />
            </ImageContainer>
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
              {episodeComments.map(comment => {
                return (
                  <Comment key={comment.id}>
                    <CommentContent>{comment.content}</CommentContent>
                    <CommentInfo>
                      <User>{comment.user}</User>
                      <DatePosted>{parseDate(comment.date)}</DatePosted>
                    </CommentInfo>
                  </Comment>
                )
              })}
            </Comments>
          </FlexContainer>
        </SubContainer>
      </Container>
    </>
  )

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
const Container = styled.div``
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 20px);
`
const EpisodeName = styled.h1``
const ShowName = styled.p`
  margin: ${props => props.theme.space.medium} 0;
  font-size: 40px;
`
const EpisodeDetails = styled.p`
  margin-bottom: ${props => props.theme.space.medium};
`
const EpisodeInfo = styled.p`
  font-weight: 300;
  margin-bottom: ${props => props.theme.space.medium};
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`
const Image = styled.img`
  width: calc(50% - 20px);
  border-radius: ${props => props.theme.radius};
`
const CommentHeading = styled.p`
  font-size: 40px;
  margin: 20px 0;
`
const Textarea = styled.textarea`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 20px;
  padding: ${props => props.theme.space.medium};
  margin-bottom: ${props => props.theme.space.small};
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
  margin-top: ${props => props.theme.space.large};
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
  align-items: center;
`
const DatePosted = styled.p`
  font-size: 16px;
  font-weight: 300;
`
const User = styled.p`
  font-weight: bold;
`

// Export
export default EpisodePost