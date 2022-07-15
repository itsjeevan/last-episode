// Imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Normalize } from 'styled-normalize'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'

// Styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #282D40;
    color: white;
    font-family: 'Roboto Condensed', sans-serif; 
  }
`
const theme = {
  color: {
    secondary: '#474C5E',
    tertiary: '#00D1FF'
  },
  space: {
    small: '10px',
    medium: '20px',
    large: '40px'
  }
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Normalize />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
)