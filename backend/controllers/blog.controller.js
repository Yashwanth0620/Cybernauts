const errorHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

const { uploadFileAndGetUrl } = require("./drive.controller");

const addBlog = errorHandler(async (req, res) => {
  const { title, date, description } = req.body;
  let image = null;
  if (req.file) {
    try {
      const tempPath = path.join(__dirname, "temp.jpg");
      fs.writeFileSync(tempPath, req.file.buffer);

      // Upload using event ID instead of title
      image = await uploadFileAndGetUrl(tempPath, "blog");

      fs.unlinkSync(tempPath);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to upload image");
    }
  }

  // Validate required fields
  if (!title || !date || !description || !image) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Create new blog entry
  const newBlog = new Blog({
    title,
    date,
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
