// Imports
import styled from 'styled-components'
import notFoundShowAndSeason from '../../assets/404-show-and-season.jpg'
import PropTypes from 'prop-types'

// Individual show
const Show = ({ show, onClickShow, activeShow }) => (
  <Container onClick={() => onClickShow(show)}>
    <Image
      className={activeShow === show.id ? 'highlight' : ''}
      alt={show.name}
      src={show.poster_path
        ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
        : notFoundShowAndSeason}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = notFoundShowAndSeason
      }}
    />
    <ShowName>{show.name}</ShowName>
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
  @media screen and (max-width: 767px) {
    width: calc(50% - 20px);
  }
`
const Image = styled.img`
  border-radius: ${props => props.theme.radius};
  width: 100%;
  ${Container}:hover & {
    ${props => props.theme.highlight}
  }
`
const ShowName = styled.p`
  text-align: center;
`

// Export
export default Show