// Imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'

// Styles
const theme = {
  color: {
    secondary: '#474C5E',
    tertiary: '#00D1FF'
  },
  space: {
    small: '10px',
    medium: '20px',
    large: '40px'
  },
  radius: '25px'
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)