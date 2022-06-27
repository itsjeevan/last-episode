import Show from './Show'

const Shows = ({ shows, setShowSelected, setSeasons, setEpisodes }) => (
  <div>
    <h1>Shows</h1>
    {shows.map(show => (
      <Show
        key={show.id}
        show={show}
        setShowSelected={setShowSelected}
        setSeasons={setSeasons}
        setEpisodes={setEpisodes}
      />
    ))}
  </div>
)

export default Shows