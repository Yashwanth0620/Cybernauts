const express = require("express");
const router = express.Router();

const {getMembers, getCurrentMembers,getYears} = require("../controllers/member.controller");

router.get("/", getCurrentMembers);
router.get("/years", getYears);
router.get("/:year", getMembers);



module.exports = router;
