import React from "react";
// This file has the same CSS as RegisterEvent, (same class definitions)
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/EventDetails.css";
import { useAuth } from "../AuthContext";

export default function EventDetails() {
  const navigate = useNavigate();
  const { role } = useAuth();
    const isAdmin = role === "admin";
    const location = useLocation();
    const { event } = location.state || {};
  const openEventEditForm = () => {
    navigate("/admin/edit-event", { state: { event } });
  };

  const deleteEvent = async () => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the event "${event.title}"?`
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_BACKEND_URI}:3001/admin/events/${event._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("Event deleted successfully.");
        // Optionally refresh the list or navigate to another page
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to delete event: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting the event:", error);
      alert("An error occurred while deleting the event. Please try again.");
    }
  };
  const handeladdcontribution=()=>{

  }
  const handeladdwiners=()=>{

  }

  return (
    <div>
      {/* <div className="overlay"></div> */}

      {/* Events Details Page */}
      <div className="event-details-page">
        <div className="event-flex">
        <h1 className="event-name">{event.title}</h1>
        <p className="date">{event.startDate.substring(0, 10)}</p>
        <br />
        <p className="people">
          <b>Organized By: </b>
          {event.organizer || "--"} <br />
          <b>Respective faculty: </b>
          {event.faculty[0] || "--"} <br />
          <b>Chief guest(s): </b>
          {event.chiefGuest.length > 0
            ? event.chiefGuest.map((element) => element).join(", ")
            : "--"}
        </p>

        <p className="description">&nbsp;&nbsp;&nbsp;{event.desc}</p>
        

        {/* Image Grid */}
        <div className="image-grid">
          {event.images && event.images.length > 0 ? (
            event.images.map((url, index) => (
              <div className="image-container">
                <img
                  key={index}
                  src={url}
                  alt={`Event Image ${index + 1}`}
                  className="grid-image"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        </div>
        <div className="event-button">
        {isAdmin && (
          <div className="btn-wrap">
            <button onClick={handeladdcontribution} className="admin-btn contribut">
              Add Contribution
            </button>
            <button onClick={handeladdwiners} className="admin-btn winers">
              Add Winers
            </button>
            <button onClick={openEventEditForm} className="admin-btn edit">
              Edit Event
            </button>
            <button onClick={deleteEvent} className="admin-btn delete">
              Delete Event
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
