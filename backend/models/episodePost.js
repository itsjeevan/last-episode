// Imports
const mongoose = require('mongoose')

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

// Format object returned by MongoDB
episodePostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Exports
module.exports = mongoose.model('episodePost', episodePostSchema)