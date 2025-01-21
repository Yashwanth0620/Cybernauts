import React, { useState } from "react";
import "../styles/AddBlogForm.css";

export default function AddBlogForm({ closeForm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Event added successfully!");
    closeForm();
  };

  return (
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="Date">Date:</label>
          <input type="date" id="Date" name="Date" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}