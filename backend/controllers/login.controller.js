const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorHandler = require('express-async-handler');
require('dotenv').config();
const secret = process.env.SECRET;

// @desc Check User Login
// @API POST /auth/login
const checkUser = errorHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await adminModel.findOne({ email });
    if (user) {
       
        const role = user.role;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            jwt.sign({ user }, secret, (err, token) => {
                if (!err) {
                    res.status(200).json({ status: "success", token, email,role });
                } else {
                    res.status(500)
                    throw new Error("JWT Error");
                }
            });
        } else {
            res.status(401)
            throw new Error("Invalid Credentials");
        }
    } else {
        res.status(500)
        throw new Error("Server Error");
    }
});

// @desc Save User for Registration
// @API POST /auth/register
const saveUser = errorHandler(async (req, res) => {
    const user = req.body;
    const existingUser = await adminModel.findOne({ email: user.email });

    if (existingUser) {
        res.status(400)
        throw new Error("User already exists");
    } else {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await adminModel.create(user);
        res.status(200).json({ status: "success", message: "Registered Successfully" });
    }
});

module.exports = {
    checkUser,
    saveUser
}
