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
    //asynchronous ,db run, so then()
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
            //same name varunnath kond aanu acno,psw,uname oke single aayi kodukunnath sherikum acno:acno nammal kodukkunna name same aanenkil eee name...allenki aa name thanne kodukkanam. ingane aanu.
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

//login
login = (req, res) => {
    const { acno, psw } = req.body
    //users table/collection il poyi nokum acno undonnu....undel then use for resolve
    users.findOne({ acno, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "Login success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                acno: user.acno
            })
        }
        else {
            res.status(404).json({
                message: "Incorrect acno or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

//Balance check
getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200,
            })
        }
        else {
            res.status(404).json({
                message: "User Not Exists",
                status: false,
                statusCode: 404
            })
        }
    })

}
//Money transfer
moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, psw, date } = req.body

    //convert amount to number,,input field value will be string so convert string to Number.
    var amnt = parseInt(amount)

    //check sender details
    users.findOne({ acno: sAcno, psw }).then(suser => {
        if (suser) {
            //check reciiver details in db
            users.findOne({ acno: rAcno }).then(ruser => {
                if (ruser) {
                    //check amount with sender balance
                    if (amnt <= suser.balance) {

                        //update sender object
                        suser.balance = suser.balance - amnt
                        suser.transactions.push({ tacno: rAcno, amount: amnt, type: "DEBIT", date })
                        suser.save()

                        //update reciever object
                        ruser.balance = ruser.balance + amnt
                        ruser.transactions.push({ tacno: sAcno, amount: amnt, type: "CREDIT", date })
                        ruser.save()

                        res.status(200).json({
                            message: "transaction success",
                            status: true,
                            statusCode: 200
                        })
                    } else {
                        res.status(406).json({
                            message: "Insufficient balance",
                            status: false,
                            statusCode: 406
                        })
                    }


                } else {
                    res.status(404).json({
                        message: "Invalid credit credentials",
                        status: false,
                        statusCode: 404
                    })
                }
            })


        } else {
            res.status(404).json({
                message: "Invalid debit credentials",
                status: false,
                statusCode: 404
            })
        }
    })
}

// accountStatement
accountStatement=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                message:user.transactions,
                status:true,
                statusCode:200
            })
        }else{
            req.status(404).json({
                messgae:"user not exists",
                status:false,
                statusCode:404
            })
        }
    })
}

//function call ivide alla vere page aanu so ivide ninnu export
//multidata export = {}
module.exports = { register, login, getBalance,moneyTransfer,accountStatement }