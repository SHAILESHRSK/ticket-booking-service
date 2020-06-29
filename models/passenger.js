const mongoose = require('mongoose');
const val = require('@hapi/joi');

const passengerSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    name : {
        type : String, 
        required : true
    },
    sex : {
        type : String,
        required : true
    },
    age : {
        type : String, 
        required : true
    },
});

function validatePassenger(passenger){
    return val.validate(passenger, {
        email: val.string().min(5).max(35).required().email(),
        name: val.string().trim().min(5).max(50).required(),
        sex: val.string().trim().max(1).required(),
        age: val.number().min(18).required(),
    });
}

module.exports = {
    Passenger: mongoose.model('passenger', passengerSchema),
    validatePassenger: validatePassenger,
}