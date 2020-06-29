const mongoose = require('mongoose');

//Adding `unique: true` won't work since it's not a validator
//We will have to manually check it on the request received
const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength: 5,
        maxlength: 35
    },
    password: {
        type : String, 
        required:true,
        minlength: 5,
        maxlength: 100,
    },
    isAdmin : {
        type : Boolean,
        required:true
    }
});

module.exports = {
    Admin: mongoose.model('admin', adminSchema),
}