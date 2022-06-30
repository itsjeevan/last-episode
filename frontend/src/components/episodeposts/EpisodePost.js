// Individual episode post
const EpisodePost = ({ episodePost }) => {

  // Base url for images
  const baseUrl = 'https://image.tmdb.org/t/p/w500'

  // If directly linking to episode post or on refresh
  if (!episodePost) {
    return (
      <h1>Loading</h1>
    )
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
      <h2>Comments</h2>
      {episodePost.episodeComments.map(comment => {
        return (
          <p key={comment.id}>{comment.content}</p>
        )
      })}
    </>
  )


}

// Export
export default EpisodePost