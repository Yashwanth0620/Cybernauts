import React, { useState } from "react";
import "../styles/MemberModel.css";

export default function MemberModel({ closeModal, handleSubmit, formData, handleChange }) {


  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Assign Role</h2>
        <h3>Designation: {formData.designation}</h3>
        
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Roll No:
            <input
              type="text"
              name="rollNo"
              placeholder="Enter rollno"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Upload Image:
            <input className="modal-img"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </label>
          <label>
           Discription:
            <input
              type="text"
              name="discription"
              placeholder="Enter one line discript"
              value={formData.discription}
              onChange={handleChange}
              required
            />
          </label>

         

          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
