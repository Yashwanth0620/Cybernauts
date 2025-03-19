const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const errorHandler = require("express-async-handler");
// require("dotenv").config();
const secret = process.env.SECRET;

// @desc Check User Login
// @API POST /auth/login
const checkUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  jwt.sign({ user }, secret, (err, token) => {
    if (err) {
      res.status(500);
      throw new Error("JWT Error");
    }

    res.status(200).json({
      status: "success",
      token,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    });
  });
});

// @desc Save User for Registration
// @API POST /auth/register
const saveUser = errorHandler(async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await adminModel.findOne({ email: user.email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.role = user.role.toLowerCase();

    const newUser = new adminModel(user);
    console.log(newUser);
    await newUser.save();

    res
      .status(200)
      .json({ status: "success", message: "Registered Successfully" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  checkUser,
  saveUser,
};
