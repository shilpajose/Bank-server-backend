
//router object = express library
const express=require('express')

//import logic.js functions
const { register, login, getBalance, accountStatement } = require('../controllers/logic')

//router object
const router = new express.Router()

// create account - signup
// function call ,register
router.post('/bankuser/createacc',register)

//login
router.post('/bankuser/login',login)

//balance check 
//Url param = sending data with the URL
//get=single data
//post=More than one data
router.get('/bankuser/balance/:acno',getBalance)
//money transfer 
router.post('/bankuser/money-transfer',moneyTransfer)
// account statements
router.get('/bankuser/account-statement/:acno',accountStatement)
// profile view

//delete account


//export router
module.exports=router
