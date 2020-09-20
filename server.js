const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const reset = require('./controllers/reset')	
const forgot = require('./controllers/forgot')
const {Client,Pool} = require('pg')

const pool = new Pool({
	user:'postgres',
	host:'127.0.0.1',
	database:'facerec',
	password:'shubham28'
})

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'shubham28',
    database : 'facerec'
  }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{res.send("Hello,Its working")})

app.post('/signIn', (req,res) => {signin.handlesignIn(req,res,bcrypt,db)})

app.post('/Register' , (req,res) => {register.handleRegister(req,res,bcrypt,db)})

app.get('/Profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.put('/imageurl', (req,res) => {image.handleAPI(req,res)})

app.post('/Forgot', (req,res) => {forgot.handleForgot(req,res,db)})	

app.post('/Reset', (req,res) => {reset.handleReset(req,res,bcrypt,db)})	

app.listen(process.env.PORT || 3000,() => {
	console.log('Server is running at Port: ${process.env.PORT}')
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//disableHostCheck: true
