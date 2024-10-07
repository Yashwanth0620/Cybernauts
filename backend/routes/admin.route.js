const express = require("express");
const router = express.Router();

const {getEvents, addEvent, updateEvent, deleteEvent, addUpdates, sendMail, removeParticipant, sendResponse} = require("../controllers/admin.controller");

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
router.post("/response/:contactId", sendResponse);

module.exports = router;

