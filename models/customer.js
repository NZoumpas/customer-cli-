const mongoose = require('mongoose')


//Customers Schema
const customerSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    phone:{type:String},
    email:{type:String}
})

//Define end Export
module.exports = mongoose.model('Customer', customerSchema)