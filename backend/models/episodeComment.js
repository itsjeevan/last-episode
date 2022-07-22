// Imports
const mongoose = require('mongoose')

// Schema for episode comments
const episodeCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
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
  episodePost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'episodePost',
    required: true
  }
})

// Format object returned by MongoDB
episodeCommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Exports
module.exports = mongoose.model('episodeComment', episodeCommentSchema)