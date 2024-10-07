const express = require("express");
const router = express.Router();

const {getEvents, addEvent, updateEvent, deleteEvent, addUpdates, sendMail, removeParticipant} = require("../controllers/admin.controller");

router.route("/events")
    .get(getEvents)
    .post(addEvent);

router.route("/events/:id")
    .patch(updateEvent)
    .delete(deleteEvent);
    
router.route("/event/remove/:id")
    .patch(removeParticipant);

router.post("/notify", addUpdates);
router.post("/events/mail/:eventId", sendMail);

module.exports = router;

