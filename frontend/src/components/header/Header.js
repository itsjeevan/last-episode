// Imports
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import logo from '../../assets/logo.svg'

// Header
const Header = ({ user, setUser }) => {

  // Logout button event handler
  const handleOnClickLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Container>
      <SubContainer>
        <Logo src={logo} alt="Logo" />
        <Title>Last Episode</Title>
        {/* Create links that modify url */}
        <Link to="/">Browse</Link>
        <Link to="/create">Create</Link>
      </SubContainer>
      <SubContainer>
        {user
          ?
          <>
            <Username>{user.username}</Username>
            <Logout href="" onClick={handleOnClickLogout}>Logout</Logout>
          </>
          : <Link to="/login">Login</Link>
        }
      </SubContainer>
    </Container>
  )
}

// Styles
const Container = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 125px;
  border-bottom: 1px solid ${props => props.theme.color.secondary};
  margin-bottom: ${props => props.theme.space.large};
`
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Logo = styled.img`
  width: 75px;
  margin-right: ${props => props.theme.space.medium};
`
const Title = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  margin-right: calc(${props => props.theme.space.large} - ${props => props.theme.space.small})
`
const Link = styled(NavLink)`
  font-size: 20px;
  text-decoration: none;
  color: white;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  border-radius: ${props => props.theme.radius};
  margin-left: ${props => props.theme.space.small};
  &:hover,
  &[class*="active"] {
    background-color: ${props => props.theme.color.tertiary};
  }
`
const Logout = styled.button`
  height: auto;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  margin-left: ${props => props.theme.space.small};
`
const Username = styled.p`
  font-weight: 300;
`

// Export
export default Header