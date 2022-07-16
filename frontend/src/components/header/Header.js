// Imports
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import logo from './logo.svg'

// Styles
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 125px;
  border-bottom: 1px solid ${props => props.theme.color.secondary};
  margin-bottom: ${props => props.theme.space.large};
`
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Logo = styled.img`
  width: 75px;
  margin-left: ${props => props.theme.space.medium};
  margin-right: ${props => props.theme.space.medium};
`
const LogoTitle = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  margin-right: calc(${props => props.theme.space.large} - ${props => props.theme.space.small})
`
const NavItem = styled(NavLink)`
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

// Header
const Header = ({ user, setUser }) => {

  // Logout button event handler
  const handleOnClickLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Nav>
      <NavContainer>
        <Logo src={logo} alt="Logo" />
        <LogoTitle>Last Episode</LogoTitle>
        {/* Create links that modify url */}
        <NavItem to="/">Browse</NavItem>
        <NavItem to="/create">Create</NavItem>
      </NavContainer>
      <NavContainer>
        {user
          ?
          <>
            <p>{user.username}</p>
            <button onClick={handleOnClickLogout}>logout</button>
          </>
          : <NavItem to="/login">Login</NavItem>
        }
      </NavContainer>
    </Nav>
  )
}

// Export
export default Header