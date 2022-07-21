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
            <h2>Comments</h2>
            <form onSubmit={handleOnSubmitCommentForm}>
              <input value={commentInput} onChange={handleOnChangeCommentInput} />
              <button type="submit">Post Comment</button>
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

// Export
export default EpisodePost