// Imports
const mongoose = require('mongoose')

// Schema for user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20
  },
  passwordHash: {
    type: String,
    required: true,
    maxLength: 250
  },
  episodePosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'episodePost',
    }
  ],
  episodeComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'episodeComment'
    }
  ]
})

// Format object returned by MongoDB
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Exports
module.exports = mongoose.model('user', userSchema)