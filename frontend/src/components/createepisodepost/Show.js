// Imports
import styled from 'styled-components'
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import PropTypes from 'prop-types'

// Individual show
const Show = ({ onClickShow, activeShow, show }) => (
  <Container to='/create' onClick={() => onClickShow(show)}>
    <Image
      className={activeShow === show.id ? 'highlight' : ''}
      alt={show.name}
      src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundShowAndSeason
      }}
    />
    <Text>{show.name}</Text>
  </Container>
)

// PropTypes
Show.propTypes = {
  onClickShow: PropTypes.func.isRequired,
  activeShow: PropTypes.number,
  show: PropTypes.object.isRequired
}

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(25% - 30px);
  cursor: pointer;
  gap: ${props => props.theme.space.medium};
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Container}:hover & {
    ${props => props.theme.highlight}
  }
`
const Text = styled.p`
  text-align: center;
`

// Export
export default Show