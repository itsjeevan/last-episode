// Imports
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  else {
    return (
      <Error>
        <p>{ message }</p>
      </Error>
    )
  }
}

// PropTypes
Message.propTypes = {
  message: PropTypes.string
}

// Styles
const Error = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  border-radius: ${props => props.theme.radius};
  top: ${props => props.theme.space.large};
  margin-bottom: ${props => props.theme.space.large};
  background: red;
  padding: ${props => props.theme.space.small} ${props => props.theme.space.large};
`

// Export
export default Message