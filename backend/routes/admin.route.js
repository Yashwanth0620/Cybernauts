const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {isAuthenticated} = require("../middlewares/superAuthMiddleware");

const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  addUpdates,
  sendMail,
  removeParticipant,
  sendResponse,
  validateAdmin,
  updateAdmin,
  deleteAdmin,
  fetchAdmins
} = require("../controllers/admin.controller");
const {
  addMember,
  getMembers,
  deleteMember,
  addContribution,
  getCurrentMembers,
  getYears,
  editMember,
  getMember,
  deleteContribution
} = require("../controllers/member.controller");
const { addBlog } = require("../controllers/blog.controller");

router.route("/validate").get(validateAdmin);

router.route("/:id").put(updateAdmin).delete(deleteAdmin);

//routes for event operations
router.route("/events").get(getEvents).post(upload.single("poster"), addEvent);

router
  .route("/events/:id")
  .put(
    upload.fields([
      { name: "poster", maxCount: 1 }, // Single file
      { name: "images", maxCount: 20 }, // Multiple files (adjust maxCount as needed)
    ]),
    updateEvent
  )
  .delete(deleteEvent);

// router.route("/blog").post(addBlog);

router.route("/event/remove/:id").patch(removeParticipant);

//routes for notifications
router.post("/notify", addUpdates);
router.post("/events/mail/:eventId", sendMail);
router.post("/response/:contactId", sendResponse);

//routes for members operations
router.route("/members/add/").post(upload.single("image"), addMember);
router.get("/members/", getCurrentMembers);
router.get("/members/:year", getMembers);
router.get("/members/years", getYears);
router.delete("/members/:year/:id", deleteMember);
router.get("/members/:year/:id", getMember);
router.patch("/members/:year/:id",upload.single("image"), editMember);
router.post("/members/addcontribution/:year/:id",upload.single("image"), addContribution);
router.delete("/members/deletecontribution/:year/:memberId/:contributionId",deleteContribution);

router.route("/").get(isAuthenticated, fetchAdmins);

module.exports = router;


/* NOTE**********************
  use addContribution method code from members controller in the updateEvent function 
  in the event controller.
  As we only

*/