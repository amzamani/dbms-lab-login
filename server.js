const express = require('express')
const session = require('express-session')
const path = require('path');


const Promise = require('bluebird')
const AppDAO = require('./dao')
const createU = require('./createUser')
const dao = new AppDAO('./database.sqlite3');
const creatingU = new createU(dao)

function forDBfunction(){
  
  creatingU.createTable()
  .then((result)=>console.log('result :' + result))
  .catch((err) => {
    console.log('Error: ')
    console.log(JSON.stringify(err))
  })




}
forDBfunction();



const { db, Users } = require('./db')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express()

const PORT = process.env.PORT || 4444

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())




app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: '24knb6k247b2k7b2k7bk247hb2kh7b2',
}))

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  // bcrypt.hash('myPassword', 10, function(err, hash) {
  //   // Store hash in database
  // });
  
  bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
  const user = Users.create({

    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hash, // NOTE: in production we save hash of password
    email: req.body.email
  })
  let data = {
    
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    
    password: req.body.password,
     // NOTE: in production we save hash of password
     createdAt: Date(),
     updatedAt: Date()
    
  }
  console.log(data);
  creatingU.createNewUser(data.username, data.firstname, data.lastname, data.email, data.password, data.createdAt, data.updatedAt)
});


  res.render("newuser")
})

app.get('/', (req, res) => {
  res.render('login')
})
app.get('/login', (req, res) => {
  res.render('login')
})



app.post('/login', async (req, res) => {
  const user = await Users.findOne({where: { username: req.body.username }})
  if (!user) {
    return res.status(404).render('login', { error: 'No such username found' })
  }
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result !==true ) {
      return res.status(401).render('login', { error: 'Incorrect password' })
    }
    req.session.userId = user.id
    res.redirect('/profile')
  })
})

app.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login')
  }
  const user = await Users.findByPk(req.session.userId)
  res.render('profile', { user })
  creatingU.getUserByUsername(req.session.userId)
  .then((userdataa)=>console.log('getting user' + JSON.stringify(user)))
  .catch((err)=>console.log(err))
})

app.get('/logout', (req, res) => {
  req.session.userId = null
  res.redirect('/login')
})

db.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`started on http://localhost:${PORT}`))
  })
  .catch(console.error)


