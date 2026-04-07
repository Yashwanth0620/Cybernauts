import React, { useState } from "react";
// This file has the same CSS as RegisterEvent, (same class definitions)
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/EventDetails.css";
import { useAuth } from "../AuthContext";
import DeleteComformModal from "./Admin/DeleteComformModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContributionModal from "./Admin/ContributionModal";
import SuggestionsModal from "./Admin/SuggestionsModal";

export default function EventDetails() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const openContributeModal = () => setIsContributeModalOpen(true);
  const closeContributeModal = () => setIsContributeModalOpen(false);

  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const openSuggestionsModal = () => setIsSuggestionsModalOpen(true);
  const closeSuggestionsModal = () => setIsSuggestionsModalOpen(false);

  const navigate = useNavigate();
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const location = useLocation();
  const { event } = location.state || {};
  const openEventEditForm = () => {
    navigate("/admin/edit-event", { state: { event } });
  };
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contributionmodal-overlay")) {
      closeContributeModal();
    }
    if (e.target.classList.contains("suggestionsmodal-overlay")) {
      closeSuggestionsModal();
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
        toast.success("Event Deleted Successfully...!")
        navigate("/events", { replace: true });
      } else {
        // const errorData = await response.json();m
        toast.error("Event Not Deleted...!")
      }
    } catch (error) {
      console.error("Error deleting the event:", error);
      toast.success("Internal Error...!")
    }
  };



  const handeladdwiners = () => {
    navigate("/events/addwinners", { state: { event } })
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/admin/events/${event._id}/export`,
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
        a.download = `${event.title}_registrations.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        toast.error("Failed to export registrations");
      }
    } catch (error) {
      console.error("Error exporting registrations:", error);
      toast.error("Error exporting registrations");
    }
  };

  return (
    <>
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

            <p className="people" style={{ marginTop: '20px' }}>
              <b>Total Registrations: </b> {event.participants?.length || 0}
            </p>
            {event.averageRating > 0 && (
              <p className="people" style={{ marginTop: '5px' }}>
                <b>Average Rating: </b> {event.averageRating.toFixed(1)} / 5
              </p>
            )}

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


            {/* Winners Section */}
            {event.winners && event.winners.length > 0 && (
              <div className="winners-section" style={{ marginTop: '30px' }}>
                <h2>Winners</h2>
                <div className="winners-list">
                  {event.winners.map((winner, index) => (
                    <div key={index} className="winner-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#ffd700' }}>{winner.position} Place</h3>
                      <p><strong>Prize Money:</strong> {winner.prizeMoney}</p>
                      <p><strong>Type:</strong> {winner.type}</p>
                      <div className="winner-members">
                        <strong>Members:</strong>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                          {winner.members.map((member, mIndex) => (
                            <li key={mIndex} style={{ margin: '5px 0' }}>
                              {member.name} ({member.collegename})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="event-button">
            {isAdmin && (
              <div className="btn-wrap">
                <button
                  onClick={handleExport}
                  className="admin-btn"
                  style={{ backgroundColor: '#28a745' }}
                >
                  Export Data
                </button>
                <button
                  onClick={openSuggestionsModal}
                  className="admin-btn"
                  style={{ backgroundColor: '#17a2b8' }}
                >
                  View Suggestions
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
                <button
                  onClick={async () => {
                    const confirmSend = window.confirm(
                      "Are you sure you want to send certificates to all participants?"
                    );
                    if (!confirmSend) return;

                    try {
                      toast.info("Sending certificates... This may take a while.");
                      const response = await fetch(
                        `${process.env.REACT_APP_BACKEND_URI}/certificate/${event._id}`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );

                      const data = await response.json();

                      if (response.ok) {
                        toast.success(
                          `Certificates Sent! Success: ${data.sentCount}, Failed: ${data.errorCount}`
                        );
                      } else {
                        toast.error(data.message || "Failed to send certificates.");
                      }
                    } catch (error) {
                      console.error("Error sending certificates:", error);
                      toast.error("Error sending certificates.");
                    }
                  }}
                  className="admin-btn"
                  style={{ backgroundColor: '#6f42c1' }} // Purple color
                >
                  Issue Certificates
                </button>
                <button
                  onClick={async () => {
                    const confirmSend = window.confirm(
                      "Are you sure you want to send feedback request emails to all participants?"
                    );
                    if (!confirmSend) return;

                    try {
                      toast.info("Sending feedback requests...");
                      const response = await fetch(
                        `${process.env.REACT_APP_BACKEND_URI}/feedback/${event._id}/request`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );

                      const data = await response.json();

                      if (response.ok) {
                        toast.success(
                          `Requests Sent! Success: ${data.sentCount}, Failed: ${data.errorCount}`
                        );
                      } else {
                        toast.error(data.message || "Failed to send requests.");
                      }
                    } catch (error) {
                      console.error("Error sending feedback requests:", error);
                      toast.error("Error sending requests.");
                    }
                  }}
                  className="admin-btn"
                  style={{ backgroundColor: '#ffc107', color: 'black' }} // Web safe Orange/Yellow
                >
                  Request Feedback
                </button>

                <button onClick={openEventEditForm} className="admin-btn edit">
                  Edit Event
                </button>
                <button onClick={openDeleteModal} className="admin-btn delete">
                  Delete Event
                </button>
              </div>

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
            {isSuggestionsModalOpen && (
              <div
                className="suggestionsmodal-overlay"
                onMouseDown={handleOverlayClick}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1000,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <SuggestionsModal
                  closeSuggestions={closeSuggestionsModal}
                  feedbacks={event.feedbacks}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
