// Imports
const mongoose = require('mongoose')

// Schema for user
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  episodePosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'episodePost'
    }
  ]
})

// Format object returned by MongoDB
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

// Exports
module.exports = mongoose.model('user', userSchema)