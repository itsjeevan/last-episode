import { useEffect, useState } from 'react'
import userService from '../../services/users'

const User = () => {

  const [episodePostsCommented, setEpisodePostsCommented] = useState([])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    userService.getEpisodePostsCommented(user.id)
      .then(response => {
        setEpisodePostsCommented(response)
      })
  }, [])

  return (
    <>
      <h1>User data</h1>
      {
        episodePostsCommented.map(episodePost => (
          <div to={`/episodepost/${episodePost.id}`} key={episodePost.id}>
            <img
              alt={episodePost.showName}
              src={`https://image.tmdb.org/t/p/w500/${episodePost.episodeImage}`}
            />
            <div>
              <p>{episodePost.showName}</p>
              <p>Season {episodePost.seasonNumber} Episode {episodePost.episodeNumber}: {episodePost.episodeName}</p>
              <p>{episodePost.episodeInfo
                ? episodePost.episodeInfo
                : 'No episode info found.'
              }</p>
            </div>
          </div>
        )).reverse()
      }
    </>
  )
}

export default User