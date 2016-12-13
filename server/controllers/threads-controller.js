module.exports = {
  create: (req, res) => {
    res.send('CREATE ARTICLE')
  },
  add: (req, res) => {
    res.render('/add')
  }
}
