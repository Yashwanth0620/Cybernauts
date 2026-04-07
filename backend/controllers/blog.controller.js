const errorHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

const { uploadFileAndGetUrl } = require("./drive.controller");

const addBlog = errorHandler(async (req, res) => {
  const { title, description } = req.body;
  const logPath = path.join(__dirname, "..", "debug.log");
  fs.appendFileSync(logPath, `[AddBlog] Request. Title: ${title}, hasFile: ${!!req.file}\n`);

  let image = null;
  if (req.file) {
    const tempPath = path.join(__dirname, `temp_${Date.now()}.jpg`);
    try {
      fs.writeFileSync(tempPath, req.file.buffer);
      fs.appendFileSync(logPath, `[AddBlog] Temp file written to ${tempPath}\n`);

      // Upload using event ID instead of title
      image = await uploadFileAndGetUrl(tempPath, "blog");
      fs.appendFileSync(logPath, `[AddBlog] Image uploaded: ${image}\n`);

      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    } catch (error) {
      fs.appendFileSync(logPath, `[AddBlog] Error: ${error.message}\n`);
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch (e) { /* ignore */ }
      }
      res.status(500);
      throw new Error(`UPLOAD FAILED (v2): ${error.message}`);
    }
  }

  // Validate required fields
  if (!title || !description || !image) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Create new blog entry
  const newBlog = new Blog({
    title,
    description,
    image,
  });

  // Save to database
  await newBlog.save();

  res.status(201).json({ message: "Blog added successfully", blog: newBlog });
});

const getBlogs = errorHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({ success: true, blogs });
});

module.exports = { addBlog, getBlogs };
