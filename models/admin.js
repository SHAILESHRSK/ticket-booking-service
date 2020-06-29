const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength: 5,
        maxlength: 35,
    },
    password: {
        type : String, 
        required:true,
        minlength: 5,
        maxlength: 20,
    },
    isAdmin : {
        type : Boolean,
        required:true
    }
});

module.exports = {
    Admin: mongoose.model('admin', adminSchema),
}