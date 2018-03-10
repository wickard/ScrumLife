const Sequelize = require('sequelize')
const db = require('../db')

const Board = db.define('board', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Board;
