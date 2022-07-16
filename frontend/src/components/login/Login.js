// Imports
import { useState } from 'react'
import loginService from '../../services/login'
import userService from '../../services/users'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

// Login
const Login = ({ setUser }) => {

  const navigate = useNavigate()

  // Set Login / Sign Up visibility
  const [loginVisibility, setLoginVisibility] = useState(true)

  // Username & password inputs (controlled components)
  const [username, setUsername] = useState('')
  const handleOnChangeUsername = event => setUsername(event.target.value)
  const [password, setPassword] = useState('')
  const handleOnChangePassword = event => setPassword(event.target.value)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const handleOnChangePasswordConfirm = event => setPasswordConfirm(event.target.value)

  // Login form event handler
  const handleOnClickLogin = async event => {
    event.preventDefault()
    // Try to login user
    try {
      const user = await loginService.login({ username, password })
      // Save user info to local storage
      window.localStorage.setItem('user', JSON.stringify(user))
      // Set user state to response (token and username)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    }
    catch(exception) {
      // @To-do: Create error message on frontend
      console.log(exception.response.data)
    }
  }

  // Sign up form event handler
  const handleOnClickSignUp = async event => {
    event.preventDefault()
    if (password !== passwordConfirm) {
      return
    }
    // Try to login user
    try {
      await userService.create({ username, password })
      handleOnClickLogin(event)
    }
    catch(exception) {
      // @To-do: Create error message on frontend
      console.log(exception.response.data)
    }
  }

  // Form visibility event handler
  const handleOnClickVisibility = (event) => {
    event.preventDefault()
    setLoginVisibility(!loginVisibility)
  }

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
        <Text>Don&apos;t have an account? <Link href="" onClick={handleOnClickVisibility}>Sign Up</Link></Text>
      </>
    )
  }

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
        <Text>Have an account? <Link href="" onClick={handleOnClickVisibility}>Login</Link></Text>
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
  width: 500px;
  height: 50px;
  margin-bottom: ${props => props.theme.space.medium};
`
const Button = styled.button`
  margin: 0 auto;
  margin-top: calc(${props => props.theme.space.large} - ${props => props.theme.space.medium});
`
const Text = styled.p`
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