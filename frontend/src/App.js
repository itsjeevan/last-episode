import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [show, setShow] = useState('')

  const handleOnSubmitForm = event => {
    event.preventDefault()
    axios
      .get('http://localhost:3001/api/episodeposts')
      .then(response => {
        response.data.forEach(show => {
          console.log(show)
        })
      })
  }

  const handleOnChangeShow = event => {
    setShow(event.target.value)
  }

  return (
    <form onSubmit={handleOnSubmitForm}>
      <div>show: <input value={show} onChange={handleOnChangeShow} /></div>
      <button type="submit">submit</button>
    </form>
  )
}

export default App
