const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength: 5,
        maxlength: 35,
    },
    name : {
        type : String, 
        required : true,
        minlength: 5,
        maxlength: 35,
    },
    sex : {
        type : String,
        required : true,
        maxlength: 1
    },
    age : {
        type : Number, 
        required : true,
        min: 18
    },
});

module.exports = {
    Passenger: mongoose.model('passenger', passengerSchema),
}