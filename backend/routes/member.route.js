const express = require("express");
const router = express.Router();

const {getMembers, getCurrentMembers} = require("../controllers/member.controller");

router.get("/", getCurrentMembers);
router.get("/:year", getMembers);


module.exports = router;
