//import model
const users = require("../models/collections")

//Register-Account creation like function
//destructuring in js
register = (req, res) => {
    //destructuring
    // acno=req.body.acno
    //const{acno}=req.body
    const { acno, psw, uname } = req.body

    //check user data in collection
    //syntax anusarich=dbname.collectionname.findOne({key:value}) aanu...ivide model il ulla key acno and thott mukalil value edukunna name acno um same aayath kond aanu {acno} nu single aayi kodukunnath
    users.findOne({ acno }).then(user => {
        if (user) {
            // res.send("User Already exists")
            //json() = js code converts to json and send to the server

            res.status(400).json({
                message: "User Already exists",
                status: false,
                statusCode: 400
            })
        }
        else {
            //create an object for user
            //same name varunnath kond aanu acno,psw,uname oke single aayi kodukunnath sherikum acno:acno ingane aanu.
            //balance=0, adyam 0 balance aayirikumallo.
            let newUser = new users({
                acno,
                uname,
                psw,
                balance: 0,
                transactions: []
            })
            //save in db
            newUser.save()
            // res.send("Account created successfully")
            //json() = js code converts to json and send to the server
            res.status(201).json({
                message: "Account created successfully",
                status: true,
                statusCode: 201
            })
        }
    })
}
//function call ivide alla vere page aanu so ivide ninnu export
//multidata export = {}
module.exports = { register }