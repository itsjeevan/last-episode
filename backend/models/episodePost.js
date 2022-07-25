// Imports
const mongoose = require('mongoose')

// Schema for episode post
const episodePostSchema = new mongoose.Schema({
  showName: {
    type: String,
    required: true
  },
  showImage: {
    type: String
  },
  seasonNumber: {
    type: Number,
    required: true
  },
  seasonImage: {
    type: String
  },
  episodeNumber: {
    type: Number
  },
  episodeName: {
    type: String
  },
  episodeInfo: {
    type: String
  },
  episodeImage: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  episodeComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'episodeComment'
    }
  ]
})

// Format object returned by MongoDB
episodePostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Exports
module.exports = mongoose.model('episodePost', episodePostSchema)