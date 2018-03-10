const router = require('express').Router()
const {User, Board} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Board.create(req.body)
  .then()
})
