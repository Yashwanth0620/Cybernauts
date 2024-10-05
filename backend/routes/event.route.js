const express = require("express");
const router = express.Router();

const {getMembers, addParticipant} = require("../controllers/event.controller");

router.get("/:year", getMembers);
router.patch("/:id", addParticipant);

module.exports = router;
