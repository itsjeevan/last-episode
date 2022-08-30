// Import
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tvService from '../../services/tv'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Search for shows
const ShowSearch = ({ setShows, setSeasons, setEpisodes, user, setMessage }) => {

  const navigate = useNavigate()

  // Search input (controlled component)
  const [showInput, setShowInput] = useState('')
  const handleOnChangeShowInput = event => setShowInput(event.target.value)

  // Form submission event handler
  const handleOnSubmitFormShowSearch = async event => {
    event.preventDefault()
    // Redirect if not logged in
    if (!user) {
      navigate('/login')
      return
    }
    // Validation: Frontend
    if (!showInput) {
      setMessage('Error: No input provided')
      setTimeout(() => setMessage(null), 2000)
      return
    }
    // Search for shows via API
    try {
      const showsResult = await tvService.getShows(showInput)
      // Store results
      setShows(showsResult)
      // Reset seasons & episodes
      setSeasons([])
      setEpisodes([])
    }
    // Validation: Backend
    catch(exception) {
      setMessage('Error: No input provided')
      setTimeout(() => setMessage(null), 2000)
    }
  }

  return (
    <Form onSubmit={handleOnSubmitFormShowSearch}>
      <input
        value={showInput}
        onChange={handleOnChangeShowInput}
        placeholder="Search for a show..."
      />
      <button type="submit">Search</button>
    </Form>
  )
}

// PropTypes
ShowSearch.propTypes = {
  setShows: PropTypes.func.isRequired,
  setSeasons: PropTypes.func.isRequired,
  setEpisodes: PropTypes.func.isRequired,
  user: PropTypes.object,
  setMessage: PropTypes.func.isRequired
}

// Styles
const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.space.medium};
  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: center;
  }
`

// Export
export default ShowSearch