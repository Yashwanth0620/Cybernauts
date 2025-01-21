import React from "react";
import "./styles/RegisterEvent.css";
import { useNavigate } from "react-router-dom";

export default function RegisterEvent({ event, isAdmin }) {
  const navigate = useNavigate();

  const openGoogleForm = (event, e) => {
    e.preventDefault();
    window.open(event.form, "_blank");
  };

  const openEventEditForm = () => {
    navigate("/admin/edit-event", { state: { event } });
  };

  const deleteEvent = async () => {
  
    const confirmation = window.confirm(
      `Are you sure you want to delete the event "${event.title}"?`
    );
    if (!confirmation) return;
  
    try {
      const response = await fetch(`http://localhost:3001/admin/events/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
  
      if (response.ok) {
        alert("Event deleted successfully.");
        // Optionally refresh the list or navigate to another page
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete event: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting the event:", error);
      alert("An error occurred while deleting the event. Please try again.");
    }
  };
  

  return (
    <div>
      {/* <div className="overlay"></div> */}

      {/* Register page */}
      <div className="register-page">
        <h1 className="event-name">{event.title}</h1>
        <p className="date">{event.startDate}</p>
        <br />
        <p className="people">
          <b>Organized By:&nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.organizer || "--"} <br />
          <b>Respective faculty: &nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.faculty[0] || "--"} <br />
          <b>Chief guest(s): &nbsp;&nbsp;&nbsp;&nbsp;</b>
          {event.chiefGuests
            ? event.chiefGuests.array.map((element) => element.name).join(", ")
            : "--"}
        </p>

        <p className="description">&nbsp;&nbsp;&nbsp;{event.desc}</p>
        <p className="participants">
          Participants count:{" "}
          {event.participants ? event.participants.length : 0}
        </p>

        <div className="register-button">
          {!isAdmin ? (
            <button onClick={(e) => openGoogleForm(event, e)}>Register</button>
          ) : (
            <>
              <button onClick={openEventEditForm} className="admin-btn edit">
                Edit Event
              </button>

              <button onClick={deleteEvent} className="admin-btn delete">
                Delete Event
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
