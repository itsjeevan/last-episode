// Imports
const mongoose = require('mongoose')

// URL to connect to MongoDB
const url = process.env.MONGODB_URI

// Connect to MongoDB
console.log('connecting to MongoBD')
mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDBL', error.message)
  })

// Schema for episode post
const episodePostSchema = new mongoose.Schema({
  showName: {
    type: String,
    required: true
  },
  episodeSeason: {
    type: Number,
    required: true
  },
  episodeNumber: {
    type: Number,
    required: true
  },
  episodeName: {
    type: String,
    required: true
  },
  episodeInfo: {
    type: String,
    required: true
  }
})

// Format object returned by MongoDB by converting 'id' to string
episodePostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export model
module.exports = mongoose.model('episodePost', episodePostSchema)