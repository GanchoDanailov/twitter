const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let threadSchema = mongoose.Schema({
  title: {
    type: String,
    required: requiredValidationMessage,
    unique: true
  },
  description: {
    type: String,
    required: requiredValidationMessage
  },
  salt: String,
  hashedPass: String,
  answers: [{
    userID: {
      type: Number
    },
    content: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

mongoose.model('Thread', threadSchema)
