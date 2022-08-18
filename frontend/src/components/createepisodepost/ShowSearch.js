// Import
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
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
      const showsResult = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${showInput}&include_adult=false`)
      // Store results
      setShows(showsResult.data.results)
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
      <Button type="submit">Search</Button>
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
`
const Button = styled.button`
  margin-left: ${props => props.theme.space.large};
`

// Export
export default ShowSearch