// Imports
import { useState, useEffect } from 'react'
import loginService from '../../services/login'
import episodePostService from '../../services/episodeposts'

// Login
const Login = () => {

  // Username & password inputs (controlled components)
  const [username, setUsername] = useState('')
  const handleOnChangeUsername = event => setUsername(event.target.value)
  const [password, setPassword] = useState('')
  const handleOnChangePassword = event => setPassword(event.target.value)

  // User details (token and username)
  const [user, setUser] = useState(null)

  // Check on first load if user details found in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      episodePostService.setToken(user.token)
    }
  }, [])

  // Login form event handler
  const handleOnSubmitLogin = async event => {
    event.preventDefault()
    // Try to login user
    try {
      const user = await loginService.login({ username, password })
      // Save user info to local storage
      window.localStorage.setItem('user', JSON.stringify(user))
      // Set token for creating episode posts
      episodePostService.setToken(user.token)
      // Set user state to response (token and username)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      // @To-do: Create error message on frontend
      console.log('login failed')
    }
  }

  // Login form to be rendered
  const loginForm = () => (
    <form onSubmit={handleOnSubmitLogin}>
      <div>
        username:
        <input type="text" value={username} onChange={handleOnChangeUsername} />
      </div>
      <div>
        <input type="password" value={password} onChange={handleOnChangePassword} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // Logout button event handler
  const handleOnClickLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      <h1>Login</h1>
      {/* Render login form if no user */}
      {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleOnClickLogout}>logout</button>
        </div>
      }
    </div>
  )
}

// Export
export default Login