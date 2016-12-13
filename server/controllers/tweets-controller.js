let Tweet = require('mongoose').model('Tweet')

module.exports = {
  register: (req, res) => {
    res.render('tweet/register')
  },
  addTweet: (req, res) => {
    function extractHashTags (message) {
      var hashTags = []
      var recursive = function (str) {
        str = str.replace('!', ' ').replace('?', ' ').replace('?', ' ').replace('.', ' ').replace(',', ' ')
        var newStr = str.substring(str.indexOf('#'))
        var hashtag = newStr.substring(newStr.indexOf(0), newStr.indexOf(' ')) || newStr
        hashTags.push(hashtag)
        newStr = newStr.replace(hashtag, '')
        if (newStr.length <= 0) {
          return hashTags
        } else {
          return (recursive(newStr))
        }
      }
      return recursive(message)
    }
    let tweet = req.body
    let hashTags = extractHashTags(tweet.message)
    console.log(hashTags)
    if (tweet.message === '') {
      tweet.globalError = 'Message is required!'
        //res.render('tweet/register', tweet)
    } else {
      tweet.hashTags = hashTags
      Tweet
        .create(tweet)
        .then(tweet => {
          console.log(tweet)
          Tweet.find({hashTags: '#kor2'}, function (err, docs) {
            console.log('kor ' + docs)
          })
          res.sendStatus(200)
        })
    }
  }
}
