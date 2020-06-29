//MODULE IMPORTS
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//MODEL IMPORTS
const { Admin } = require('../models/admin');

//ROUTER OBJECT INIT
const router = express.Router();

//ADMIN LOGIN {POST}
router.post('/login', async (req, res) => {
    try {
        // Validate Email
        const admin = await Admin.findOne({
            email: req.body.email
        });
        if (!admin) {
            return res.status(404).send("Invalid Email!");
        }

        // Validate Password
        const passwordVerify = await bcrypt.compare(req.body.password, admin.password);
        if (!passwordVerify) {
            return res.status(404).send("Incorrect Password!");
        }

        //JWT Authentication
        const token = jwt.sign({
            _id: admin._id,
            isAdmin: admin.isAdmin
        }, "jwtPrivateKey");

        //Send the token in the response header
        return res.header('x-auth-header', token)
            .status(200)
            .send("Login Successful!");
    } catch (err) {
        console.log("ERROR:: ", err);
    }
});

//ADMIN SIGNUP {POST}
router.post('/signup', async (req, res) => {
    try {
        // // Check if Admin already exists
        let admin = await Admin.findOne({
            email: req.body.email
        });
        if (admin) {
            return res.status(400).send("Admin Already Exists!");
        }

        //Create a new Admin instance
        admin = new Admin(req.body);

        //Modify it to store a hashed password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        
        //Save the admin to the Atlas Cluster
        const data = await admin.save();

        //Generate a JSON Web Token
        const token = jwt.sign({
            _id: data._id,
            isAdmin: data.isAdmin
        }, "jwtPrivateKey");

        //Send the generated token back as a response
        return res.status(200).json({
            message: "SignUp Successful!",
            token
        });
    } catch (err) {
        console.log("ERROR:: ", err);
    }
});

module.exports = router;