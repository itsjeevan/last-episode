// Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Error handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  // If accessing an incorrect 'id'
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  // If data entered into MongoDB doesn't pass validation
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  // If JWT error
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  // If JWT expired
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next(error)
}

// Exports
module.exports = {
  unknownEndpoint,
  errorHandler
}