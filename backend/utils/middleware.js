// Unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Error handler
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  // If unique entry exists in MongoDB already
  if (error.name === 'MongoServerError') {
    return response.status(400).send({ error: 'duplicate entry in db' })
  }
  // If accessing an incorrect 'id'
  else if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  // If data entered into MongoDB doesn't pass validation
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'data not valid for mongodb' })
  }
  // If JWT error
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  // If JWT expired
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  // If accessing property of null (user._id from a user)
  // else if (error.name === 'TypeError') {
  //   return response.status(400).json({ error: 'type error' })
  // }
  next(error)
}

// Exports
module.exports = {
  unknownEndpoint,
  errorHandler
}