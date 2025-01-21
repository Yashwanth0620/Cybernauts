import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEventForm.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddEventForm() {
  const location = useLocation();
  const { event } = location.state || {};
  const [contributors, setContributors] = useState(event.contributors);
  const [contribution, setContribution] = useState("");
  const [roll, setRoll] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleAddContributor = () => {
    if (contribution && roll) {
      setContributors((prev) => [...prev, { contribution, roll }]);
      setContribution("");
      setRoll("");
      setShowPopup(false);
    } else {
      alert("Please fill in both fields!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    const formElements = e.target.elements;

    // Append basic form fields
    formData.append("title", formElements.title.value);
    formData.append("type", formElements.type.value);
    formData.append("startDate", formElements.startDate.value);
    formData.append("endDate", formElements.endDate.value);
    formData.append("desc", formElements.description.value);
    formData.append("startTime", formElements.startTime.value);
    formData.append("endTime", formElements.endTime.value);
    formData.append("form", formElements.form.value);
    formData.append("organizer", formElements.organizer.value);
    formData.append("faculty", formElements.faculty.value);
    formData.append("chiefGuest", formElements.chiefGuest.value);

    // Append contributors as a JSON string
    formData.append("contributors", JSON.stringify(contributors));

    // Append the poster file
    const posterFile = formElements.poster.files[0];
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      // Make the API call
      const response = await axios.put(
        "http://localhost:3001/admin/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Event added successfully:", response.data);
      navigate("/events");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add the event. Please try again.");
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Event Type:</label>
          <select id="type" name="type" required>
            <option value="" disabled>
              Select type
            </option>
            <option value="Hackathon">Hackathon</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={event.startDate} required />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={event.endDate} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
            value={event.desc}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" value={event.startTime} required />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" value={event.endTime} required />
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster:</label>
          <input type="file" id="poster" name="poster" accept="image/*" />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
          />
        </div>

        <div className="form-group">
          <label htmlFor="form">Form:</label>
          <input
            type="text"
            id="form"
            name="form"
            placeholder="Form URL"
            value={event.form}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer">Organizer:</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={event.organizer}
            placeholder="Enter Organizer Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            value={event.faculty}
            placeholder="Enter Faculty Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="chiefGuest">Chief Guest:</label>
          <input
            type="text"
            id="chiefGuest"
            name="chiefGuest"
            value={event.chiefGuest}
            placeholder="Enter Chief Guest Name"
            required
          />
        </div>

        <div className="form-group contributors-group">
          <div className="contributors-header">
            <label>Contributors:</label>
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="btn-add-contributor"
            >
              Add Contributor
            </button>
          </div>
          <ul className="contributor-list">
            {contributors.map((contributor) => (
              <li>
                {contributor.contribution}: {contributor.roll}
              </li>
            ))}
          </ul>
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Add Contributor</h3>
              <div className="form-group">
                <label>Contribution:</label>
                <input
                  type="text"
                  placeholder="Enter contribution"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                />
              </div>
              <div className="popup-actions">
                <button onClick={handleAddContributor} type="button">
                  Add
                </button>
                <button onClick={() => setShowPopup(false)} type="button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
