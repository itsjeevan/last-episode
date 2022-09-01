// Imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loginService from '../../services/login'
import userService from '../../services/users'
import PropTypes from 'prop-types'

// Login
const Login = ({ setUser, setMessage, setEpisodePostsCommented }) => {

  const navigate = useNavigate()

  // Set Login / Sign Up visibility
  const [loginVisibility, setLoginVisibility] = useState(true)

  // Username & password inputs (controlled components)
  const [username, setUsername] = useState('')
  const handleOnChangeUsername = event => setUsername(event.target.value.toLowerCase())
  const [password, setPassword] = useState('')
  const handleOnChangePassword = event => setPassword(event.target.value)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const handleOnChangePasswordConfirm = event => setPasswordConfirm(event.target.value)

  // Login form event handler
  const handleOnClickLogin = async event => {
    event.preventDefault()
    // Validation: Frontend
    if (!username || !password) {
      setMessage('Error: Missing username or password')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Try to login user
    try {
      const user = await loginService.login({ username, password })
      // @Improve: Security vulnerability
      window.localStorage.setItem('user', JSON.stringify(user))
      // Set user state to response (token and username)
      setUser(user)
      setUsername('')
      setPassword('')
      userService.getEpisodePostsCommented(user.id)
        .then(response => {
          setEpisodePostsCommented(response)
        })
      navigate('/')
    }
    // Validation: Backend
    catch(exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 2000)
    }
  }

  // Sign up form event handler
  const handleOnClickSignUp = async event => {
    event.preventDefault()
    // Validation: Frontend
    if (!username || !password || !passwordConfirm) {
      setMessage('Error: Missing username or passwords')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (username.length > 20) {
      setMessage('Error: Username too long')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (password.length > 250) {
      setMessage('Error: Password too long')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    if (password !== passwordConfirm) {
      setMessage('Error: Passwords do not match')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Try to login user
    try {
      await userService.create({ username, password, passwordConfirm })
      handleOnClickLogin(event)
    }
    // Validation: Backend
    catch(exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), 2000)
    }
  }

  // Form visibility event handler
  const handleOnClickVisibility = (event) => {
    event.preventDefault()
    setLoginVisibility(!loginVisibility)
  }

  // Login form render
  const loginForm = () => {
    return (
      <>
        <Container>
          <Heading>Login</Heading>
          <div>
            <Input
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
              placeholder="Username"
            />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              placeholder="Password"
            />
          </div>
          <Button onClick={handleOnClickLogin}>Login</Button>
        </Container>
        <LinkText>Don&apos;t have an account? <Link href="" onClick={handleOnClickVisibility}>Sign Up</Link></LinkText>
      </>
    )
  }

  // Register form render
  const registerForm = () => {
    return (
      <>
        <Container>
          <Heading>Sign Up</Heading>
          <div>
            <Input
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
              placeholder="Username"
            />
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              placeholder="Password"
            />
          </div>
          <div>
            <Input
              type="password"
              value={passwordConfirm}
              onChange={handleOnChangePasswordConfirm}
              placeholder="Confirm Password"
            />
          </div>
          <Button onClick={handleOnClickSignUp}>Sign Up</Button>
        </Container>
        <LinkText>Have an account? <Link href="" onClick={handleOnClickVisibility}>Login</Link></LinkText>
      </>
    )
  }

  return (
    <>
      {loginVisibility
        ? loginForm()
        : registerForm()
      }
    </>
  )
}

// PropTypes
Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

// Styles
const Container = styled.form`
  margin: 0 auto ${props => props.theme.space.large} auto;
  width: fit-content;
  padding-bottom: ${props => props.theme.space.large};
  border-bottom: 2px solid ${props => props.theme.color.secondary};
`
const Heading = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.space.large};
`
const Input = styled.input`
  margin-bottom: ${props => props.theme.space.medium};
`
const Button = styled.button`
  margin: 0 auto;
  margin-top: calc(${props => props.theme.space.large} - ${props => props.theme.space.medium});
`
const LinkText = styled.p`
  font-weight: 300;
  text-align: center;
`
const Link = styled.a`
  font-weight: bold;
  color: white;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.tertiary};
  }
`

// Export
export default Login