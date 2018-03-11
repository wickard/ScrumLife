const router = require('express').Router()
const {User, Board} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//get all user's boards
router.get('/:id/boards', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => user.getBoards())
  .then(boards => res.json(boards))
})
