const express=require('express')
const routes=express.Router()
const {
    saveUser,
    checkUser
}=require('../controllers/login.controller');
const {isAuthenticated}  = require("../middlewares/superAuthMiddleware");

routes.route('/signup')
    .post(isAuthenticated, saveUser);
routes.route('/login')
    .post(checkUser)

module.exports=routes