const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sandeepramesh2401:ee44370LV396eCOG@cluster0.jerw5tw.mongodb.net/paytm')

const UserSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
})

const AccountsSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true,
    }
})

const User = mongoose.model('User',UserSchema)
const Accounts = mongoose.model('Account',AccountsSchema)

module.exports ={
    User,
    Accounts,
}