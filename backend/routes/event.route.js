const express = require("express");
const router = express.Router();

const {getEvents, addParticipant} = require("../controllers/event.controller");

router.get("/", getEvents);
router.patch("/:id", addParticipant);

module.exports = router;
