import Show from './Show'

const Shows = ({
  shows,
  setEpisodes,
  setSeasons,
  setShowId,
  setShowName,
  setShowImage
}) => {

  return (
    <div>
      <h1>Shows</h1>
      {shows.map(show => {
        return (
          <Show
            key={show.id}
            show={show}
            setEpisodes={setEpisodes}
            setSeasons={setSeasons}
            setShowId={setShowId}
            setShowName={setShowName}
            setShowImage={setShowImage}
          />
        )
      })}
    </div>
  )
}

export default Shows