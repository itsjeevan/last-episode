// Imports
import styled from 'styled-components'

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