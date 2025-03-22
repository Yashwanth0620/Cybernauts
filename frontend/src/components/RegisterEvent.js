import React, { useState } from "react";
import "./styles/RegisterEvent.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ContributionModal from "./Admin/ContributionModal";
import DeleteComformModal from "./Admin/DeleteComformModal";
export default function RegisterEvent() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const location = useLocation();
  const { event } = location.state || {};
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const openContributeModal = () => setIsContributeModalOpen(true);
  const closeContributeModal = () => setIsContributeModalOpen(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openGoogleForm = (event, e) => {
    e.preventDefault();
    window.open(event.form, "_blank");
  };

  const openEventEditForm = () => {
    navigate("/admin/edit-event", { state: { event } });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contributionmodal-overlay")) {
      closeContributeModal();
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/admin/events/${event._id}`,
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
 
  const handeladdwiners = () => {
    navigate("/events/addwinners")
  };

  return (
    <>
      <div>
        {/* <div className="overlay"></div> */}

        {/* Register page */}
        <div className="register-page">
          <div className="register-flex">
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
                ? event.chiefGuests.array
                    .map((element) => element.name)
                    .join(", ")
                : "--"}
            </p>

            <p className="description">&nbsp;&nbsp;&nbsp;{event.desc}</p>
          </div>

          <div className="register-button">
            {!isAdmin ? (
              <button
                className="register-btn"
                onClick={(e) => openGoogleForm(event, e)}
              >
                Register
              </button>
            ) : (
              <>
                <button
                  onClick={openContributeModal}
                  className="admin-btn contribut"
                >
                  Add Contribution
                </button>
                <button onClick={handeladdwiners} className="admin-btn winers">
                  Add Winers
                </button>
                <button onClick={openEventEditForm} className="admin-btn edit">
                  Edit Event
                </button>

                <button onClick={openDeleteModal} className="admin-btn delete">
                  Delete Event
                </button>
              </>
            )}

            {isDeleteModalOpen && (
              <DeleteComformModal
                closeModal={closeDeleteModal}
                handleDelete={deleteEvent}
              />
            )}

            {isContributeModalOpen && (
              <div
                className="contributionmodal-overlay"
                onMouseDown={handleOverlayClick}
              >
                <ContributionModal
                  closecontribute={closeContributeModal}
                  eventId={event._id}
                  eventName={event.title}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
