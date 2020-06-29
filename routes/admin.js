const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { validateSignup, Admin, validateLogin } = require('../models/admin');

router.post('/login', async (req, res) => {
    try {
        const {error} = validateLogin(req.body);
        if (error) {
            return res.status(400).send("Invalid Inputs");
        }
        const admin = await Admin.findOne({
            email: req.body.email
        });
        if (!admin) {
            return res.status(404).send("Invalid Email!");
        }

        const passwordVerify = await bcrypt.compare(req.body.password, admin.password);
        if (!passwordVerify) {
            return res.status(404).send("Incorrect Password!");
        }

        const token = jwt.sign({
            _id: admin._id,
            isAdmin: admin.isAdmin
        }, "jwtPrivateKey");

        //send token in header
        return res.header('x-auth-header', token).status(200).send({message : "login successful check the header"});
    } catch (err) {
        console.log(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const {error} = validateSignup(req.body);
        if (error) {
            return res.status(400).send("Invalid Inputs");
        }

        let admin = await Admin.findOne({
            email: req.body.email
        });
        if (admin) {
            return res.status(400).send("Admin Already Exists");
        }

        admin = new Admin(req.body);

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        
        const data = await admin.save();
        const token = jwt.sign({
            _id: data._id,
            isAdmin: data.isAdmin
        }, "jwtPrivateKey");

        return res.status(200).json({
            message: "Signup Successful",
            token
        });
    } catch (err) {
        return res.status(400).send("ERROR: Unsuccessful Signup!");
    }
});

module.exports = router;