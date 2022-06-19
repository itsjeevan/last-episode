// Imports
require('dotenv').config()
const app = require('./app')
const http = require('http')

// Server
const server = http.createServer(app)
const PORT = 3001
server.listen(3001, () => {
  console.log(`Server running on port ${PORT}`)
})
