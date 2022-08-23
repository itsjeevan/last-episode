// Imports
require('dotenv').config()
require('express-async-errors')
const app = require('./app')
const http = require('http')

// Server
const server = http.createServer(app)
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
