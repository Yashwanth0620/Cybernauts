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
  const { member1, filterYear } = location.state || {
    member1: {},
    filterYear: "",
  };

  const openImageModal = (image) => {
    setCurrentImage(image);
    setIsImageModalOpen(true);
  };
  
  console.log(member1);
  const [member, setMember] = useState({
    name: member1.name,
    _id: member1._id,
    rollNo: member1.rollNo,
    designation: member1.designation,
    description: member1.description,
    mobileNo: member1.mobileNo,
    email: member1.email,
    position: member1.position,
  });
  console.log(member);
  const [formData, setFormData] = useState({
    name: member.name,
    rollNo: member.rollNo,
    designation: member.designation,
    description: member.description,
    mobileNo: member.mobileNo,
    email: member.email,
    position: member.position,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setEditIsModalOpen(true);
  const closeEditModal = () => setEditIsModalOpen(false);
  const closeImageModal = () => setIsImageModalOpen(false);

  console.log(member);
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
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/admin/members/${filterYear}/${member._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Deleted Successfully...!", {
          autoClose: 1000,
          onClose: () => navigate(-1),
        });
      } else {
        toast.error("Failed to Delete...!");
      }
    } catch (error) {
      toast.error("Internal Error...!");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    formData.year = filterYear;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("rollNo", formData.rollNo);
    form.append("designation", formData.designation);
    form.append("description", formData.description);
    form.append("position", formData.position);
    form.append("mobileNo", formData.mobileNo);
    form.append("email", formData.email);
    form.append("year", filterYear);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      // Make the API call
      console.log("Form Data:", member._id);
      const response = await axios.patch(
        `http://localhost:3001/admin/members/${filterYear}/${member._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setFormData(response.data.member);
      setMember(response.data.member);
      toast.success("Member Edited successfully");

      closeEditModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Edit Member..!");
      // alert("Failed to add the event. Please try again.");
    }
  };
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <>
      <div className="MemberProfile">
        <div className="MemberProfile-container">
          <div className="MemberProfile-main">
            {console.log(member.position)}
            <h1>
              {member.designation.toUpperCase()}{" "}
              {member.position ? member.position.toUpperCase() : " "}{" "}
              {filterYear}
            </h1>
            <img src={member.image}  referrerPolicy="no-referrer" alt="" />
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
            {console.log(formData)}
            {isEditModalOpen && (
              <MemberModel
                closeModal={closeEditModal}
                handleSubmit={handleEdit}
                formData={formData}
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