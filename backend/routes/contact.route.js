const express = require("express");
const router = express.Router();

const {sendFeedback} = require("../controllers/contact.controller");

router.post("/", sendFeedback);

module.exports = router;