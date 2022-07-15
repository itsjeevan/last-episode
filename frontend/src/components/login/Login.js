// Imports
import { useState } from 'react'
import loginService from '../../services/login'
import userService from '../../services/users'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// Styles
const LoginContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`
const LoginHeading = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.space.large};
`
const LoginInput = styled.input`
  width: 500px;
  height: 50px;
  border-radius: ${props => props.theme.radius};
  margin-bottom: ${props => props.theme.space.medium};
`
const LoginButton = styled.button`
  margin-top: 40px;
`

// Login
const Login = ({ setUser }) => {

  const navigate = useNavigate()

  // Username & password inputs (controlled components)
  const [username, setUsername] = useState('')
  const handleOnChangeUsername = event => setUsername(event.target.value)
  const [password, setPassword] = useState('')
  const handleOnChangePassword = event => setPassword(event.target.value)

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
  const handleOnClickRegister = async event => {
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

  return (
    <LoginContainer>
      <LoginHeading>Login</LoginHeading>
      <form>
        <div>
          <LoginInput type="text" value={username} onChange={handleOnChangeUsername} />
        </div>
        <div>
          <LoginInput type="password" value={password} onChange={handleOnChangePassword} />
        </div>
        <LoginButton onClick={handleOnClickLogin}>login</LoginButton>
        <LoginButton onClick={handleOnClickRegister}>register</LoginButton>
      </form>
    </LoginContainer>
  )
}

// Export
export default Login