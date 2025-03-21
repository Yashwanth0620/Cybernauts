import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/EventContribution.css";
import ContributionModal from "./ContributionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewMemberImage from "./ViewMemberImage";

export default function EventContribution() {
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [tempContributions, setTempContributions] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [year, setYear] = useState([]);
 

  const openContributeModal = () => setIsContributeModalOpen(true);
  const closeContributeModal = () => setIsContributeModalOpen(false);
  const closeImageModal = () => setIsImageModalOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contributionmodal-overlay")) {
      closeContributeModal();
    }
  };

  // Handle new contribution submission
  // const handleAddContribution = (newContribution) => {
  //   setTempContributions([...tempContributions, newContribution]);
  //   closeContributeModal();
  // };

  // Delete a contribution
  const handleDelete = (index) => {
    setTempContributions(tempContributions.filter((_, i) => i !== index));
  };

  // // Finalize the contributions
  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (tempContributions.length == 0) {
  //       toast.warn("No Contribution Added..!");
  //       return;
  //     }
  //     const form1 = new FormData();
  //     form1.append("rollNo", contributionData.rollNo);
  //     form1.append("description", contributionData.description);
  //     form1.append("email", contributionData.email);
  //     form1.append("year", filterYear);
  //     if (contributionData.image) {
  //       form1.append("image", contributionData.image);
  //     }
  
  //     try {
  //       // Make the API call
  //       console.log("hiii");
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_BACKEND_URI}/admin/members/addcontribution/${filterYear}/${member._id}`,
  //         form1,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       setFormData(response.data.member);
  //       setMember(response.data.member);
  //       toast.success("MContributions Added successfully");
  //       setContributionData({
  //         description: "",
  //         image: null,
  //       });
  //     } catch (error) {
  //       toast.error("Failed to Add Contribution..!");
  //     }

  //   // setContributions([...contributions, ...tempContributions]);
  //   // setTempContributions([]); // Clear temp contributions
  // };

  // // Discard all temporary contributions
  // const handleDiscard = () => {
  //   setTempContributions([]);
  // };

  // const openImageModal = (image) => {
  //   console.log(image);
  //   setCurrentImage(image);
  //   setIsImageModalOpen(true);
  // };

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
          {[...contributions, ...tempContributions].map(
            (contribution, index) => (
              <div className="contribut-container" key={index}>
                <div className="description">{contribution.rollNo}</div>
                <div className="description">{contribution.description}</div>
                <div className="item">
                  {contribution.image ? (
                    <button
                      className="view-img"
                      // onClick={() =>
                      //   // openImageModal(contribution.image)
                      // }
                    >
                      View Image
                    </button>
                  ) : (
                    <button className="disable-view-img" disabled>
                      View Image
                    </button>
                  )}
                </div>
                <div className="item">
                  <button
                    className="icon-button delete"
                    // onClick={() => handleDelete(index)}
                  >
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff5447" }}
                    ></i>
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        <div className="Eventcontributebut">
          {/* <button className="Eventsub" onClick={handleSubmit}>
            Submit
          </button>
          <button className="EventDis" onClick={handleDiscard}>
            Discard
          </button> */}
        </div>

        {isContributeModalOpen && (
          <div
            className="contributionmodal-overlay"
            onMouseDown={handleOverlayClick}
          >
            <ContributionModal
              closecontribute={closeContributeModal}
              // addContribution={handleAddContribution}
              // members={members}
            />
          </div>
        )}
      </div>
      <ToastContainer />
      {isImageModalOpen && (
        <ViewMemberImage
          currentImage={currentImage}
          onClose={closeImageModal}
        />
      )}
    </>
  );
}
