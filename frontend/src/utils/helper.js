// Get token ready to send with request
const parseToken = () => {
  let token = null
  const loggedUserJSON = window.localStorage.getItem('user')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = `bearer ${user.token}`
  }
  return token
}

// Increment image load count, if final image loaded, scroll
const onLoad = (ref, finalCount, scrollTo) => {
  ref.current += 1
  if (ref.current === finalCount) {
    scrollTo()
  }
}

// Exports
export { parseToken, onLoad }