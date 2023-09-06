
//router object = express library
const express=require('express')

//import logic.js
const { register } = require('../controllers/logic')

//router object
const router = new express.Router()

// create account - signup
// function all ,register
router.post('/bankuser/create_acc',register)

//login


//balance check

//money transfer 

// account statements

// profile view

//delete account


//export router
module.exports=router
