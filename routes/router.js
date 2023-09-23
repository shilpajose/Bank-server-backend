
//router object = express library
const express=require('express')

//import logic.js functions
const { register, login, getBalance, accountStatement,accountDelete } = require('../controllers/logic')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

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
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)
//money transfer 
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)
// account statements
router.get('/bankuser/account-statement/:acno',jwtMiddleware,accountStatement)

//delete account
router.delete('/bankuser/delete-account/:acno',jwtMiddleware,accountDelete)

//export router
module.exports=router
