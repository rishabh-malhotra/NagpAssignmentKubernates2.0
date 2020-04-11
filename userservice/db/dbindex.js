const Sequelize = require('sequelize')
const {user} = require('./usermodel')


const db = new Sequelize({
    dialect:'mysql',
   username:'root',
   database:'nagpKubernetesAssignment2',
   password:'root',
    host:'localhost',
   port:3306
})

/* User Model */
const User = db.define('user',user)

module.exports = {
    db,
   User
  }