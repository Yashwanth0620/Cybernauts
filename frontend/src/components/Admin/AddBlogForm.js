import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/AddBlogForm.css";

import { ToastContainer, toast } from "react-toastify";

export default function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_URI}:3001/blogs`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Blog added successfully!");

      // Reset form fields
      setFormData({ title: "", date: "", description: "", image: null });

      // Clear file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to add blog");
      toast.error(error.response?.data?.message || "Failed to add blog");
    }
  };

  return (
    <>
      <div className="add-blog-form">
        <h2>Add New Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Blog title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={fileInputRef} // Attach ref to the input
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
