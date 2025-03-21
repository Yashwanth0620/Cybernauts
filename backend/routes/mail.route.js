const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = express.Router();

const {announce} = require("../controllers/mail.controller");

router.route("/").post(isAuthenticated, announce);

module.exports = router;
