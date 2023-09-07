
//router object = express library
const express=require('express')

//import logic.js functions
const { register, login } = require('../controllers/logic')


//router object
const router = new express.Router()

// create account - signup
// function call ,register
router.post('/bankuser/create_acc',register)

//login
router.post('/bankuser/login',login)

//balance check

//money transfer 

// account statements

// profile view

//delete account


//export router
module.exports=router
