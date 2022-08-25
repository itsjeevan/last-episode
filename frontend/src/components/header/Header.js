// Imports
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'
import PropTypes from 'prop-types'

// Header
const Header = ({ user, setUser, setEpisodePostsCommented }) => {

  const navigate = useNavigate()

  // Logout button event handler
  const handleOnClickLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setEpisodePostsCommented([])
    navigate('/')
  }

  return (
    <Container>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <Title>Last Episode</Title>
      </LogoContainer>
      <ContentContainer>
        <ContentSubContainer>
          {/* Create links that modify url */}
          <Link to="/">Browse</Link>
          <Link to="/create">Create</Link>
        </ContentSubContainer>
        <ContentSubContainer>
          {user
            ?
            <>
              <Link to="/user">{user.username}</Link>
              <Logout href="" onClick={handleOnClickLogout}>Logout</Logout>
            </>
            : <Link to="/login">Login</Link>
          }
        </ContentSubContainer>
      </ContentContainer>
    </Container>
  )
}

// PropTypes
Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}

// Styles
const Container = styled.nav`
  // Display & Box Model
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.large};
  padding: ${props => props.theme.space.large} 0;
  border-bottom: 2px solid ${props => props.theme.color.secondary};
  margin-bottom: ${props => props.theme.space.large};

  // Media queries
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media screen and (max-width: 575px) {
    align-items: center;
  }
`
const ContentContainer = styled.div`
  // Display & Box Model
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  // Media queries
  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.space.medium};
  }
`
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.medium}; 
`
const ContentSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.space.small};
`
const Logo = styled.img`
  width: 75px;
`
const Title = styled.p`
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`
const Link = styled(NavLink)`
  // Display & Box Model
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
  border-radius: ${props => props.theme.radius};

  // Color
  color: white;

  // Text
  font-size: 20px;
  text-decoration: none;

  // Pseudo-classes
  &:hover,
  &[class*="active"] {
    background-color: ${props => props.theme.color.tertiary};
  }
`
const Logout = styled.button`
  height: auto;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.medium};
`

// Export
export default Header