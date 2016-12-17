let Tweet = require('mongoose').model('Tweet')

module.exports = {
  register: (req, res) => {
    res.render('tweet/register')
  },
  addTweet: (req, res) => {
    function extractTags (message) {

      let hashTags = message.match(/(?:#(\w+))/g)
      let userTags = message.match(/(?:@(\w+))/g)

      if (hashTags) {
        hashTags = hashTags.map(function (v) {
          return v.replace('#', '')
        })
      }
      if (userTags) {
        userTags = userTags.map(function (v) {
          return v.replace('@', '')
        })
      }
      let tags = {
        hashTags: hashTags,
        userTags: userTags
      }
      return tags
    }

    let tweet = req.body
    console.log('tweet ' + req.body.message)
    let tags = extractTags(tweet.message)
    console.log(tags)
    if (tweet.message === '') {
      tweet.globalError = 'Message is required!'
        //res.render('tweet/register', tweet)
    } else {
      tweet.tags = tags
      Tweet
        .create(tweet)
        .then(tweet => {
          res.send(tweet)
          res.sendStatus(200)
        })
    }
  },
  searchByhash: (req, res) => {
    let hashTag = req.params.tagName

    Tweet.find({ 'tags.hashTags': hashTag }).limit(100).exec(function (err, tweets) {
      if (err) console.log(err)
      res.send(tweets[0].message)
    })
  },
  profileTweets: (req, res) => {
    let username = req.params.username

    Tweet.find({ 'tags.userTags': username }).limit(100).exec(function (err, tweets) {
      if (err) console.log(err)
      res.send(tweets[0].message)
    })
  }
}
