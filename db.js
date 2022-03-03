const Sequelize = require('sequelize')
var sqlite3 = require('sqlite3').verbose();
var db2 = new sqlite3.Database(':memory:');

let stringCreate = `CREATE TABLE
users
 (
id INTEGER PRIMARY KEY AUTOINCREMENT,
 username VARCHAR(30) NOT NULL UNIQUE,
 firstname VARCHAR(30),
 lastname VARCHAR(30),
 email VARCHAR(100),
 password VARCHAR(255) NOT NULL, createdAt DATETIME NOT NULL,
 updatedAt DATETIME NOT NULL);`

// let stringInUser = `INSERT INTO users (id,username, firstname, lastname, email, password, createdAt, updatedAt) VALUES (NULL,$1,$2,$3,$4,$5,$6,$7);
// `
// let stringVerifyUser = `
// SELECT id, username, firstname, lastname, email, password, createdAt, updatedAt FROM users AS user WHERE user, username = 'abuholyangels@gmail.com';
// `
// let stringProfileView =`
// SELECT id, username, firstname, lastname, email, password, createdAt, updatedAt FROM users AS user WHERE user.id = 1;
// `

// db2.serialize(function() {
//   db2.run("CREATE TABLE lorem (info TEXT)");
//   db2.run(stringCreate);
//   db2.run(stringInUser);

//   db2.run(stringVerifyUser);

//   db2.run(stringProfileView);
//   // console.log(firstname + ": " + lastname);

//   var stmt = db2.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db2.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });


const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + "/socialmedia.db",
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