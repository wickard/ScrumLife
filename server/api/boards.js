const router = require('express').Router()
const {User, Board} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Board.create({name: req.body.name, tag: req.body.tag})
  .then(board => {
    User.findById(req.body.userId)
    .then(user => user.addBoard(board))
  })
})
