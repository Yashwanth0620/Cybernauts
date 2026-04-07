import React, { useState } from "react";
import "./styles/RegisterEvent.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ContributionModal from "./Admin/ContributionModal";
import DeleteComformModal from "./Admin/DeleteComformModal";
import RegisterModal from "./RegisterModal";

export default function RegisterEvent() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const location = useLocation();
  const { event } = location.state || {};
  const [eventData, setEventData] = useState(event || {});

  // Update state when event changes (e.g. navigation)
  React.useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const handleRegistrationSuccess = (newParticipant) => {
    setEventData(prev => ({
      ...prev,
      participants: [...(prev.participants || []), newParticipant]
    }));
  };

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
    navigate("/admin/edit-event", { state: { event: eventData } });
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contributionmodal-overlay")) {
      closeContributeModal();
    }
  };

  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/admin/events/${eventData._id}`,
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
        navigate("/events");
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
    navigate("/events/addwinners", { state: { event: eventData } });
  };

  /* Removed misplaced code */

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/admin/events/${eventData._id}/export`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${eventData.title}_registrations.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Failed to export registrations");
      }
    } catch (error) {
      console.error("Error exporting registrations:", error);
      alert("Error exporting registrations");
    }
  };

  return (
    <>
      <div>
        {/* <div className="overlay"></div> */}

        {/* Register page */}
        <div className="register-page">
          <div className="register-flex">
            <h1 className="event-name">{eventData.title}</h1>
            <p className="date">{eventData.startDate}</p>
            <br />
            <p className="people">
              <b>Organized By:&nbsp;&nbsp;&nbsp;&nbsp;</b>
              {eventData.organizer || "--"} <br />
              <b>Respective faculty: &nbsp;&nbsp;&nbsp;&nbsp;</b>
              {eventData.faculty && eventData.faculty[0] ? eventData.faculty[0] : "--"} <br />
              <b>Chief guest(s): &nbsp;&nbsp;&nbsp;&nbsp;</b>
              {eventData.chiefGuests
                ? eventData.chiefGuests.array
                  .map((element) => element.name)
                  .join(", ")
                : "--"}
            </p>

            <p className="description">&nbsp;&nbsp;&nbsp;{eventData.desc}</p>

            <p className="registration-count" style={{ marginTop: '20px', color: 'black' }}>
              <b>Total Registrations: </b> {eventData.participants?.length || 0}
            </p>
          </div>

          <div className="register-button">
            {!isAdmin ? (
              <>
                <button
                  className="register-btn"
                  onClick={openRegisterModal}
                >
                  Register
                </button>
                <RegisterModal
                  isOpen={isRegisterModalOpen}
                  onClose={closeRegisterModal}
                  eventId={eventData._id}
                  eventTitle={eventData.title}
                  onSuccess={handleRegistrationSuccess}
                />
              </>
            ) : (
              <>
                <button
                  onClick={handleExport}
                  className="admin-btn"
                  style={{ marginBottom: '10px', backgroundColor: '#28a745' }}
                >
                  Export Data
                </button>
                <button
                  onClick={openContributeModal}
                  className="admin-btn contribut"
                >
                  Add Contribution
                </button>
                <button onClick={handeladdwiners} className="admin-btn winers">
                  Add Winners
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
