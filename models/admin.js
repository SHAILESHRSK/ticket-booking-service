const mongoose = require('mongoose');
const val = require('@hapi/joi');

const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password: {
        type : String, 
        required:true
    },
    isAdmin : {
        type : Boolean,
        required:true
    }
});

function validateSignup(admin){
    return val.validate(admin, {
        email : val.string().min(5).max(35).required().email(),
        password : val.string().min(5).max(20).required(),
        isAdmin : val.boolean().required()
    });
}

function validateLogin(admin){
    return val.validate(admin, {
        email : val.string().min(5).max(35).required().email(),
        password : val.string().min(5).max(20).required()
    });
}

module.exports = {
    Admin: mongoose.model('admin', adminSchema),
    validateSignup: validateSignup,
    validateLogin: validateLogin,
}