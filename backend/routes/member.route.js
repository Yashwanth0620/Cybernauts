const express = require("express");
const router = express.Router();

const {getMembers, addMember} = require("../controllers/member.controller");

router.get("/:year", getMembers);


module.exports = router;
