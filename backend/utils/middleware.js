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
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// Exports
module.exports = {
  unknownEndpoint,
  errorHandler
}