// Imports
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Message for to display errors and alerts
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
  // Positioning
  position: sticky;
  z-index: 2;
  top: ${props => props.theme.space.large};

  // Display & Box Model
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${props => props.theme.radius};
  margin-bottom: ${props => props.theme.space.large};
  padding: ${props => props.theme.space.small} ${props => props.theme.space.large};

  // Color
  background: red;
`

// Export
export default Message