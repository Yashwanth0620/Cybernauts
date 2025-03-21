import React, { useState } from "react";
import "../styles/AddContribute.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddContribute({
  closeModal,
  handleSubmit,
  formData,
  handleChange,
}) {

  return (
    <>
      <div className="AddContribute">
        <div className="AddContribute-overlay" onClick={closeModal}>
          <div
            className="AddContributeModel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button className='CloseButton' onClick={closeModal}>✖</button> */}
            <h2>Add Contribution</h2>

            <div className="AddItem">
              <label>Description :</label>
              <input
                type="text"
                name = "description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="AddItem">
              <label>Upload Image :</label>
              <input
                type="file"
                name = "image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="ButtonContainer">
              <button className="CancelButton" onClick={closeModal}>
                Cancel
              </button>
              <button className="SubmitButton" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      style={{
        marginTop: "60px",
        position: "fixed"
      }}
      />
    </>
  );
}
