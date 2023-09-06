//create model

// import mongoose
const mongoose=require('mongoose')

//define schema = fields and values of model(collection)
const userSchema = new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

// create model - collection name
const users=new mongoose.model("users",userSchema)

//export model - to import in another files
module.exports=users

