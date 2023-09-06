// //import env file
require('dotenv').config()

// //server creation
// //express
// // 1-import express
const express=require('express')

// //import router.....................................
const router = require('./routes/router')


// // ........2..........................................



// // 2 - create server using express
const server = express()

// //To convert all incoming json data to js
server.use(express.json())

// //import connection.js file
require('./database/connection')
// // 3 - server run
// //port
const port = 3000  || process.env.port

// // 4 - server run
server.listen(port,()=>{
    console.log(`____server.. started at portnumber ${port}____`);
})

// //set router
server.use(router)

// //api calls resolve
// // server.post('/signup',(req,res)=>{
// //     res.send("post method working...")
// // })
// // // http://localhost:4000/signup


// // server.post('/login',(req,res)=>{
// //     // console.log(req.body.acno);
// //     // console.log(req.body.psw);
// //     res.send("login worked")
// // })
// // http://localhost:4000/login