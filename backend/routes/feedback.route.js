const express = require("express");
const router = express.Router();
const { sendFeedbackRequest, submitFeedback } = require("../controllers/feedback.controller");
const { isAuthenticated } = require("../middlewares/authMiddleware");

// Route to send feedback emails (Protected: Admin only)
router.post("/:id/request", isAuthenticated, sendFeedbackRequest);

// Route to submit feedback (Public, but validates participant email)
router.post("/:id/submit", submitFeedback);

module.exports = router;
