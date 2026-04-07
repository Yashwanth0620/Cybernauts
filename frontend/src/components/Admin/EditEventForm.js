import React, { useState } from "react";
import axios from "axios";
import "../styles/AddEventForm.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddEventForm() {
  const location = useLocation();
  const { event } = location.state || {};

  // Initialize state with event details or defaults
  const [otherEventType, setOtherEventType] = useState(
    event && !["Hackathon", "Seminar", "Workshop", "Webinar"].includes(event.type)
      ? event.type
      : ""
  );
  const [eventType, setEventType] = useState(
    event && ["Hackathon", "Seminar", "Workshop", "Webinar"].includes(event.type)
      ? event.type
      : (event ? "Other" : "")
  );

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    const formElements = e.target.elements;

    const startDateTime = new Date(`${formElements.startDate.value}T${formElements.startTime.value}`);
    const endDateTime = new Date(`${formElements.endDate.value}T${formElements.endTime.value}`);

    if (endDateTime <= startDateTime) {
      alert("End Date & Time must be after Start Date & Time");
      return;
    }

    // Append basic form fields
    formData.append("title", formElements.title.value);
    formData.append("type", formElements.type.value);
    formData.append("startDate", formElements.startDate.value);
    formData.append("endDate", formElements.endDate.value);
    formData.append("desc", formElements.description.value);
    formData.append("startTime", formElements.startTime.value);
    formData.append("endTime", formElements.endTime.value);

    formData.append("organizer", formElements.organizer.value);
    formData.append("faculty", formElements.faculty.value);
    formData.append("chiefGuest", formElements.chiefGuest.value);

    // Append the poster file
    const posterFile = formElements.poster.files[0];
    if (posterFile) {
      formData.append("poster", posterFile);
    }
    const images = formElements.images.files;
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      // Make the API call
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URI}/admin/events/` + event._id,
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

  return (
    <div className="add-event-form">
      <h2>Edit Event: {event.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter event title"
            defaultValue={event?.title}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Event Type:</label>
          <select
            id="type"
            name="type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
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
          <input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={event?.startDate ? event.startDate.substring(0, 10) : ""}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={event?.endDate ? event.endDate.substring(0, 10) : ""}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
            defaultValue={event?.desc}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            defaultValue={event?.startTime}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            defaultValue={event?.endTime}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster (Leave empty to keep existing):</label>
          <input type="file" id="poster" name="poster" accept="image/*" />
          {event?.poster && <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>Current: <a href={event.poster} target="_blank" rel="noreferrer">View Poster</a></p>}
        </div>

        <div className="form-group">
          <label htmlFor="images">Images (Leave empty to keep existing):</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
          />
          {event?.images && event.images.length > 0 && <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>{event.images.length} images currently uploaded</p>}
        </div>



        <div className="form-group">
          <label htmlFor="organizer">Organizer:</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            placeholder="Enter Organizer Name"
            defaultValue={event?.organizer}
          />
        </div>

        <div className="form-group">
          <label htmlFor="faculty">Faculty:</label>
          <input
            type="text"
            id="faculty"
            name="faculty"
            placeholder="Enter Faculty Name"
            defaultValue={Array.isArray(event?.faculty) ? event.faculty.join(", ") : event?.faculty}
          />
        </div>

        <div className="form-group">
          <label htmlFor="chiefGuest">Chief Guest:</label>
          <input
            type="text"
            id="chiefGuest"
            name="chiefGuest"
            placeholder="Enter Chief Guest Name"
            defaultValue={Array.isArray(event?.chiefGuests?.array) ? event.chiefGuests.array.map(c => c.name).join(", ") : (Array.isArray(event?.chiefGuest) ? event.chiefGuest.join(", ") : event?.chiefGuest)}
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
            {contributors.map((contributor) => (
              <li key={contributor.roll}>
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
        )} */}

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
