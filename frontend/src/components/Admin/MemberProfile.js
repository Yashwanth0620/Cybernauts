import React, { useState } from "react";
import "../styles/MemberProfile.css";
import pp from "../../assets/pp.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteComformModal from "./DeleteComformModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberModel from "./MemberModel";
import ViewMemberImage from "./ViewMemberImage";

export default function MemberProfile() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const { member, filterYear } = location.state || {
    member: {},
    filterYear: "",
  };
  
  const openImageModal = (image) => {
    setCurrentImage(image);
    setIsImageModalOpen(true);
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setEditIsModalOpen(true);
  const closeEditModal = () => setEditIsModalOpen(false);
  const closeImageModal = () => setIsImageModalOpen(false);

  // console.log(member,filterYear)
  member.contributions = [
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
    {
      description: "Hii this is the desscription",
      eventName: "Name of event",
    },
  ];
  const handleDelete =async  () => {
    try {

      const response = await axios.delete(`http://localhost:3001/admin/members/${filterYear}/${member._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      console.log(response)
      if (response.status===200) {
        toast.success("Deleted Successfully...!", {
          autoClose: 1000,
          onClose: () => navigate(-1) 
        }
        );
      } else {
        toast.error("Failed to Delete...!");
      }
    } catch (error) {
      toast.error("Internal Error...!");
    }
    
  };
  const handleEdit =async  () => {
    
  };
  const handleEditChange = (e) => {
    
  };
  return (
    <>
      <div className="MemberProfile">
        <div className="MemberProfile-container">
          <div className="MemberProfile-main">
            {console.log(member.position)}
            <h1>{member.designation.toUpperCase()} {member.position ? member.position.toUpperCase() : " "} {filterYear}</h1>
            <img src={pp} alt="photo"></img>
            <div className="items">
              <h3>{member?.name?.toUpperCase() || "No Name"}</h3>
              <h3>{member?.rollNo?.toUpperCase() || "No Roll No"}</h3>

              <h4>+91{member.mobileNo}</h4>
              <br />
              <h4>{member.email}</h4>
            </div>
            <div className="buttons">
              <button>Add Contribution</button>
              <div className="but">
                <button onClick={openEditModal}>Edit</button>
                <button className="del" onClick={openModal}>
                  Delete
                </button>
              </div>
            </div>

            {isModalOpen && (
              <DeleteComformModal
                closeModal={closeModal}
                handleDelete={handleDelete}
              />
            )}
            {isEditModalOpen && (
              <MemberModel
                closeModal={closeEditModal}
                handleSubmit={handleEdit}
                formData={member}
                handleChange={handleEditChange}
              />
            )}
          </div>
          <div className="MemberProfile-body">
            <h1>Contribution :</h1>
            {member.contributions && member.contributions.length > 0 ? (
              member.contributions.map((contribution) => (
                <div className="contribut-container">
                  <div className="description">{contribution.description}</div>
                  <div className="description">{contribution.eventName}</div>
                  <div className="item">
                  <button className="view-img" onClick={() => openImageModal(contribution.image || pp)}>View Image</button>

                  </div>
                  <div className="item">
                    <button className="icon-button">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="icon-button delete">
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#ff5447" }}
                      ></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="no-contribution">No Contributions</h1>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
      {isImageModalOpen && <ViewMemberImage src={currentImage} onClose={closeImageModal} />}
    </>
  );
}
