// Imports
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './logo.svg'

// Styles
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between
`
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Logo = styled.img`
  width: 100px;
`
const NavItem = styled(Link)`
`

// Header
const Header = ({ user }) => {
  return (
    <Nav>
      <NavContainer>
        <Logo src={logo} alt="Logo" />
        <p>Last Episode</p>
        {/* Create links that modify url */}
        <NavItem to="/">Browse</NavItem>
        <NavItem to="/create">Create</NavItem>
      </NavContainer>
      <NavContainer>
        {user
          ? <NavItem to="/login">{user.username}</NavItem>
          : <NavItem to="/login">Login</NavItem>
        }
      </NavContainer>
    </Nav>
  )
}

// Export
export default Header