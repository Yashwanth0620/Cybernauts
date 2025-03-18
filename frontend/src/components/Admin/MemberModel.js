import React, { useState } from "react";
import "../styles/MemberModel.css";

export default function MemberModel({
  closeModal,
  handleSubmit,
  formData,
  handleChange,
}) {

  const standardDesignations = [
    "chairperson",
    "vice-chairperson",
    "secretary",
    "vice-secretary",
    "finance",
    "documentation",
    "technical",
    "graphics",
    "outreach",
    "event-management",
    "executive-Boys",
    "executive-Girls",
  ];
  console.log(formData)
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Assign Role</h2>
        {standardDesignations.includes(formData.designation) && <h3>Designation: {formData.designation}</h3>}
        {!standardDesignations.includes(formData.designation) && 
          <label>
          Designation:
          <input
            type="text"
            name="designation"
            placeholder="Enter additional designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </label>
        }

        <form onSubmit={handleSubmit}>
          {!formData.designation.includes("chairperson") &&
            !formData.designation.includes("secretary") &&
            formData.desig !== "additional-expertise" && (
              <label>
                Position :
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                >
                  <option disabled selected hidden>
                    Choose
                  </option>
                  <option value="member">Member</option>
                  <option value="lead">Lead</option>
                  <option value="co-lead">co-lead</option>
                </select>
              </label>
            )}
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
            <input
              className="modal-img"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Enter one line discript"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNo"
              placeholder="Enter mobile number..."
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            email:
            <input
              type="text"
              name="email"
              placeholder="Enter email..."
              value={formData.email}
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
