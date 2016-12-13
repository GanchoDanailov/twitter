const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let tweetSchema = mongoose.Schema({
  message: {
    type: String,
    required: requiredValidationMessage,
    maxlength: 140
  },
  hashTags: [{
    type: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Tweet', tweetSchema)
