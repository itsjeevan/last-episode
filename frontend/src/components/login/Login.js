// Imports
import { useState } from 'react'
import loginService from '../../services/login'
import userService from '../../services/users'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

// Styles
const LoginContainer = styled.form`
  margin: 0 auto ${props => props.theme.space.large} auto;
  width: fit-content;
  padding-bottom: ${props => props.theme.space.large};
  border-bottom: 2px solid ${props => props.theme.color.secondary};
`
const LoginHeading = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.space.large};
`
const LoginInput = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: ${props => props.theme.space.medium};
`
const LoginButton = styled.button`
  margin-top: calc(${props => props.theme.space.large} - ${props => props.theme.space.medium});
`
const VisibilityText = styled.p`
  font-weight: 300;
  text-align: center;
`
const VisibilityLink = styled.a`
  font-weight: bold;
  color: white;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.tertiary};
  }
`

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

  // Regsiter form event handler
  const handleOnClickSignUp = async event => {
    event.preventDefault()
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

  const handleOnClickVisibility = (event) => {
    event.preventDefault()
    setLoginVisibility(!loginVisibility)
  }

  const loginForm = () => {
    return (
      <>
        <LoginContainer>
          <LoginHeading>Login</LoginHeading>
          <div>
            <LoginInput
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
              placeholder="Username"
            />
          </div>
          <div>
            <LoginInput
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              placeholder="Password"
            />
          </div>
          <LoginButton onClick={handleOnClickLogin}>Login</LoginButton>
        </LoginContainer>
        <VisibilityText>Don&apos;t have an account? <VisibilityLink href="" onClick={handleOnClickVisibility}>Sign Up</VisibilityLink></VisibilityText>
      </>
    )
  }

  const registerForm = () => {
    return (
      <>
        <LoginContainer>
          <LoginHeading>Sign Up</LoginHeading>
          <div>
            <LoginInput
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
            />
          </div>
          <div>
            <LoginInput
              type="password"
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          <div>
            <LoginInput
              type="password"
              value={passwordConfirm}
              onChange={handleOnChangePasswordConfirm}
            />
          </div>
          <LoginButton onClick={handleOnClickSignUp}>Sign Up</LoginButton>
        </LoginContainer>
        <VisibilityText>Have an account? <VisibilityLink href="" onClick={handleOnClickVisibility}>Login</VisibilityLink></VisibilityText>
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

// Export
export default Login