const express = require("express");
const router = express.Router();

const {getEvents, addEvent, updateEvent, deleteEvent, addUpdates, sendMail} = require("../controllers/admin.controller");

router.use("/events")
    .get(getEvents)
    .post(addEvent);

router.use("/events/:id")
    .patch(updateEvent)
    .delete(deleteEvent);

router.post("/notify", addUpdates);
router.post("/events/mail/:eventId", sendMail);

module.exports = router;

