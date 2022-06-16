// Imports
const mongoose = require('mongoose')

// URL to connect to MongoDB
const url = process.env.MONGODB_URI

// Connect to MongoDB
console.log('connecting to MongoBD')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDBL', error.message)
  })

// Schema for episode post
const episodePostSchema = new mongoose.Schema({
  showName: String,
  episodeSeason: Number,
  episodeNumber: Number,
  episodeName: String,
  episodeInfo: String
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