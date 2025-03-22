import React,{useState} from "react";
// This file has the same CSS as RegisterEvent, (same class definitions)
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/EventDetails.css";
import { useAuth } from "../AuthContext";
import DeleteComformModal from "./Admin/DeleteComformModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContributionModal from "./Admin/ContributionModal";

export default function EventDetails() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const openContributeModal = () => setIsContributeModalOpen(true);
  const closeContributeModal = () => setIsContributeModalOpen(false);
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
        // Optionally refresh the list or navigate to another page
        setTimeout(()=>{
          navigate(-1)
        },1000)
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
    navigate("/events/addwinners")
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
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
