const express = require("express");
const router = express.Router();

const {getEvents, getRecentEvent, addParticipant} = require("../controllers/event.controller");

router.get("/", getEvents);
router.get("/recent", getRecentEvent);
router.patch("/:id", addParticipant);

module.exports = router;
