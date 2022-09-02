// Imports
const path = require('path')

// Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
}

// Error handler
const errorHandler = (error, request, response, next) => {
  // If unique entry exists in MongoDB already
  if (error.name === 'MongoServerError') {
    return response.status(422).send({ error: 'Error: Only one entry allowed' })
  }
  // If accessing an incorrect 'id'
  else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Error: Malformatted id' })
  }
  // If data entered into MongoDB doesn't pass validation
  else if (error.name === 'ValidationError') {
    return response.status(422).json({ error: 'Error: Data not valid' })
  }
  // If JWT error
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Error: Invalid token' })
  }
  // If JWT expired
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Error: Token expired' })
  }
  // If accessing property of null (user._id from a user that is not found)
  else if (error.name === 'TypeError') {
    return response.status(422).json({ error: 'Error: Type error' })
  }
  next(error)
}

// Exports
module.exports = {
  unknownEndpoint,
  errorHandler
}