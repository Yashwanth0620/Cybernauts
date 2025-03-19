import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEventForm.css";
import { useNavigate } from "react-router-dom";

export default function AddEventForm({ closeForm }) {
  const [eventType, setEventType] = useState("");
  const [otherEventType, setOtherEventType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    const formElements = e.target.elements;

    // Append basic form fields
    formData.append("title", formElements.title.value);
    formData.append("type", eventType === "Other" ? otherEventType : eventType);
    formData.append("startDate", formElements.startDate.value);
    formData.append("endDate", formElements.endDate.value);
    formData.append("desc", formElements.description.value);
    formData.append("startTime", formElements.startTime.value);
    formData.append("endTime", formElements.endTime.value);
    formData.append("form", formElements.form.value);
    formData.append("organizer", formElements.organizer.value);
    formData.append("faculty", formElements.faculty.value);
    formData.append("chiefGuest", formElements.chiefGuest.value);

    // Append the poster file
    const posterFile = formElements.poster.files[0];
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      // Make the API call
      const response = await axios.post(
        "http://localhost:3001/admin/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/events");
    } catch (error) {
        console.error("Error adding event:", error);
        alert("Failed to add the event. Please try again.");
      }
    };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
      
  //     if (isSubmitting) return; // Prevent multiple submissions
  //     setIsSubmitting(true); // Disable the button
    
  //     const formData = new FormData();
  //     const formElements = e.target.elements;
    
  //     formData.append("title", formElements.title.value);
  //     formData.append("type", eventType === "Other" ? otherEventType : eventType);
  //     formData.append("startDate", formElements.startDate.value);
  //     formData.append("endDate", formElements.endDate.value);
  //     formData.append("desc", formElements.description.value);
  //     formData.append("startTime", formElements.startTime.value);
  //     formData.append("endTime", formElements.endTime.value);
  //     formData.append("form", formElements.form.value);
  //     formData.append("organizer", formElements.organizer.value);
  //     formData.append("faculty", formElements.faculty.value);
  //     formData.append("chiefGuest", formElements.chiefGuest.value);
  //     console.log(eventType === "Other" ? otherEventType : eventType);
      
  //     const posterFile = formElements.poster.files[0];
  //     if (posterFile) {
  //       formData.append("poster", posterFile);
  //     }
    
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3001/admin/events",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       console.log("Event added successfully:", response.data);
  //       navigate("/events");
  //     } catch (error) {
  //       console.error("Error adding event:", error);
  //       alert("Failed to add the event. Please try again.");
  //       setIsSubmitting(false); // Re-enable on error
  //     }
  //   };

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
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Event Type:</label>
          <select
            id="type"
            name="type"
            required
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="Hackathon">Hackathon</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Webinar">Webinar</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {eventType === "Other" && (
          <div className="form-group">
            <label htmlFor="otherType">Specify Event Type:</label>
            <input
              type="text"
              id="otherType"
              name="otherType"
              placeholder="Enter event type"
              value={otherEventType}
              onChange={(e) => setOtherEventType(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" required />
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

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" name="startTime" required />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" name="endTime" required />
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster:</label>
          <input type="file" id="poster" name="poster" accept="image/*" />
        </div>

        {/* <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="form">Form:</label>
          <input
            type="text"
            id="form"
            name="form"
            placeholder="Form URL"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer">Organizer:</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
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
            placeholder="Enter Chief Guest Name"
            required
          />
        </div>

        {/* <div className="form-group contributors-group">
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
            {contributors.map((contributor, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleDeleteContributor(index)}
                  className="btn-delete-contributor"
                >
                  ✖
                </button>
                {contributor.contribution}: {contributor.roll}
              </li>
            ))}
          </ul>
        </div> */}

        {/* {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Add Contributor</h3>
              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Discription:</label>
                <input
                  type="text"
                  placeholder="Enter Discription"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Upload Image:</label>
                <input type="file" accept="image/*" />
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
        )} */}

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>  
      </form>
    </div>
  );
}
