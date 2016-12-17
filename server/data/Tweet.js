const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let tweetSchema = mongoose.Schema({
  message: {
    type: String,
    required: requiredValidationMessage,
    maxlength: 140
  },
  tags: {
    hashTags: [{
      type: String
    }],
    userTags: [{
      type: String
    }]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Tweet', tweetSchema)
