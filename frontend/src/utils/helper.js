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

export { parseToken }