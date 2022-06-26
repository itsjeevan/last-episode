import Episode from './Episode'

const Episodes = ({
  episodes,
  showId,
  showName,
  showImage,
  seasonId,
  seasonNumber,
  seasonImage
}) => {

  return (
    <div>
      <h1>Episodes</h1>
      {episodes.map(episode => {
        return (
          <Episode
            key={episode.id}
            episode={episode}
            showId={showId}
            showName={showName}
            showImage={showImage}
            seasonId={seasonId}
            seasonNumber={seasonNumber}
            seasonImage={seasonImage}
          />
        )
      })}
    </div>
  )
}

export default Episodes