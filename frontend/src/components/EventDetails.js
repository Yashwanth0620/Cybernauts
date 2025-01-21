import React from "react";
// This file has the same CSS as RegisterEvent, (same class definitions)
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "./styles/EventDetails.css";

export default function EventDetails({ event, isAdmin }) {
  const navigate = useNavigate();
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

      {/* Events Details Page */}
      <div className="event-details-page">
        <h1 className="event-name">{event.title}</h1>
        <p className="date">{event.startDate}</p>
        <br />
        <p className="people">
          <b>Organized By: &nbsp;&nbsp;&nbsp;&nbsp;</b>
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

        {/* Image Carousel */}
        <div className="image-carousel">
          {/* <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            dynamicHeight
          >
            {event.images && event.images.length > 0 ? (
              event.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Event image ${index + 1}`} />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
            <div><img src={banner} alt="" /></div>
            <div><img src={banner} alt="" /></div>
            <div><img src={banner} alt="" /></div>
          </Carousel> */}
        </div>

        {isAdmin && (
          <div className="btn-wrap">
            <button onClick={openEventEditForm} className="admin-btn edit">Edit Event</button>
            <button onClick={deleteEvent} className="admin-btn delete">Delete Event</button>
          </div>
        )}
      </div>
    </div>
  );
}
