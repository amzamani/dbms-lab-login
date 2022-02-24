const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite'
})

const Users = db.define('user', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING(30),
    unique: true,
    allowNull: false
  },
  firstname: {
    type: Sequelize.DataTypes.STRING(30),
    
  },
  lastname: {
    type: Sequelize.DataTypes.STRING(30),
    
  },
  email: {
    type: Sequelize.DataTypes.STRING(100),
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
})

module.exports = {
  db, Users
}