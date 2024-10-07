const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


const {getEvents, addEvent, updateEvent, deleteEvent, addUpdates, sendMail, removeParticipant, sendResponse} = require("../controllers/admin.controller");
const { addMember, getMembers, deleteMember, addContributions } = require("../controllers/member.controller");

//routes for event operations
router.route("/events")
    .get(getEvents)
    .post(addEvent);

router.route("/events/:id")
    .patch(updateEvent)
    .delete(deleteEvent);
    
router.route("/event/remove/:id")
    .patch(removeParticipant);

//routes for notifications
router.post("/notify", addUpdates);
router.post("/events/mail/:eventId", sendMail);
router.post("/response/:contactId", sendResponse);

//routes for members operations
router.post("/members/add", upload.single("image"), addMember);
router.get("/members/:year", getMembers);
router.delete("/members/:id", deleteMember);
router.patch("/members/:id", addContributions);


module.exports = router;

