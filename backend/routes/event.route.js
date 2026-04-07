const express = require("express");
const router = express.Router();

const {getEvents, getRecentEvent, addParticipant,getDashboard} = require("../controllers/event.controller");

router.get("/", getEvents);
router.get("/recent", getRecentEvent);
router.patch("/:id", addParticipant);
router.get("/dashboard", getDashboard);

module.exports = router;
