import React, { useState } from "react";
import "../styles/EventContribution.css";
import ContributionModal from "./ContributionModal";

const initialContributions = [
  {
    rollNo: "22B81A05U1",
    description:
      "Project on AI qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
    image: null,
  },
  { rollNo: "22B81A05U2", description: "Developed Web App", image: null },
  { rollNo: "22B81A05U3", description: "Contributed to Robotics", image: null },
  { rollNo: "22B81A05U3", description: "Contributed to Robotics", image: null },
  { rollNo: "22B81A05U3", description: "Contributed to Robotics", image: null },
  { rollNo: "22B81A05U3", description: "Contributed to Robotics", image: null },
  { rollNo: "22B81A05U3", description: "Contributed to Robotics", image: null },
];

export default function EventContribution() {
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  const openContributeModal = () => setIsContributeModalOpen(true);
  const closeContributeModal = () => setIsContributeModalOpen(false);
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contributionmodal-overlay")) {
      closeContributeModal();
    }
  };
  return (
    <>
      <div className="Eventcontribution">
        <div className="Addcontributevent">
          <button onClick={openContributeModal}>Add Contribution+</button>
        </div>

        <div className="title-container">
          <span className="title">Contributed Members</span>
        </div>

        <div className="ContributeCard">
          {initialContributions.map((contribution, index) => (
            <div className="contribut-container" key={index}>
              <div className="description">{contribution.rollNo}</div>
              <div className="description">{contribution.description}</div>
              <div className="item">
                {contribution.image ? (
                  <button className="view-img">View Image</button>
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="item">
                <button className="icon-button delete">
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#ff5447" }}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="Eventcontributebut">
          <button className="Eventsub">Submit</button>
          <button className="EventDis">Discard</button>
        </div>
        {isContributeModalOpen && (
          <div
            className="contributionmodal-overlay"
            onMouseDown={handleOverlayClick}
          >
            <ContributionModal closecontribute={closeContributeModal} />
          </div>
        )}
      </div>
    </>
  );
}
