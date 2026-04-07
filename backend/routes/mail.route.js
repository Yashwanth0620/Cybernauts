const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const multer = require("multer");
const router = express.Router();

const { announce } = require("../controllers/mail.controller");

const upload = multer({ storage: multer.memoryStorage() });

router.route("/").post(isAuthenticated, upload.single("file"), announce);

module.exports = router;
