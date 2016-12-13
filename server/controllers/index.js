let homeController = require('./home-controller')
let usersController = require('./users-controller')
let threadsController = require('./threads-controller')
let tweetsController = require('./tweets-controller')

module.exports = {
  home: homeController,
  users: usersController,
  threads: threadsController,
  tweets: tweetsController
}
