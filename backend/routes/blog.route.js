const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { addBlog, getBlogs } = require("../controllers/blog.controller");

const { isAuthenticated } = require("../middlewares/authMiddleware");

router.route("/").get(getBlogs).post(isAuthenticated, upload.single("image"), addBlog);

module.exports = router;
