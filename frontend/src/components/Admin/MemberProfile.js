import React, { useState,useEffect } from "react";
import "../styles/MemberProfile.css";
import pp from "../../assets/pp.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteComformModal from "./DeleteComformModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberModel from "./MemberModel";
import ViewMemberImage from "./ViewMemberImage";
import AddContribute from "./AddContribute";

export default function MemberProfile() {
  const [currentImage, setCurrentImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { memberId, filterYear } = location.state || {
    memberId: "",
    filterYear: "",
  };

  const [member, setMember] = useState();

  useEffect(() => {
    if (!memberId || !filterYear) {
      navigate(-1); // Redirect back if parameters are missing
      return;
    }
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/members/${filterYear}/${memberId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMember(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching member:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, []);

  const openImageModal = (image) => {
    console.log(image);
    setCurrentImage(image);
    setIsImageModalOpen(true);
  };
  
  const [formData, setFormData] = useState({});

  const [contributionData, setContributionData] = useState({
    description: "",
    image: null,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = () => setEditIsModalOpen(true);
  const closeEditModal = () => setEditIsModalOpen(false);
  const openAddModal = () => setAddIsModalOpen(true);
  const closeAddModal = () => setAddIsModalOpen(false);
  const closeImageModal = () => setIsImageModalOpen(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://${process.env.REACT_APP_BACKEND_URI}:3001/admin/members/${filterYear}/${member._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      const response = await axios.patch(
        `http://${process.env.REACT_APP_BACKEND_URI}:3001/admin/members/${filterYear}/${member._id}`,
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
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!contributionData.description) {
      toast.warn("Description is required");
      return;
    }
    contributionData.year = filterYear;

    const form1 = new FormData();
    form1.append("rollNo", contributionData.rollNo);
    form1.append("description", contributionData.description);
    form1.append("email", contributionData.email);
    form1.append("year", filterYear);
    if (contributionData.image) {
      form1.append("image", contributionData.image);
    }

    try {
      // Make the API call
      console.log("hiii");
      const response = await axios.post(
        `http://localhost:3001/admin/members/addcontribution/${filterYear}/${member._id}`,
        form1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setFormData(response.data.member);
      setMember(response.data.member);
      toast.success("Member Added successfully");
      closeAddModal();
      setContributionData({
        description: "",
        image: null,
      });
    } catch (error) {
      toast.error("Failed to Add Contribution..!");
    }
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setContributionData({ ...contributionData, image: files[0] });
    } else {
      setContributionData({ ...contributionData, [name]: value });
    }
  };


  const handleDeleteContribution = async (id1) => {
    try {
      // Make the API call
      console.log("hiii");
      const response = await axios.delete(
        `http://localhost:3001/admin/members/deletecontribution/${filterYear}/${member._id}/${id1}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setMember(response.data.member)
      setFormData(response.data.member)
      toast.success("Deleted Succesfully...!")
      
    } catch (error) {
      toast.error("Failed to Delete Contribution..!");
    }
  };



  return (
    <>
    {console.log(loading)}
    {console.log(member)}
    {loading ? (
        <p>Loading...</p>
      ) : member ? (
      <div className="MemberProfile">
        <div className="MemberProfile-container">
          <div className="MemberProfile-main">
            <h1>
              {member.designation.toUpperCase()}{" "}
              {member.position ? member.position.toUpperCase() : " "}{" "}
              {filterYear}
            </h1>
            <img
              src={member.image ? member.image : pp}
              referrerPolicy="no-referrer"
              alt=""
            />
            <div className="items">
              <h3>{member?.name?.toUpperCase() || "No Name"}</h3>
              <h3>{member?.rollNo?.toUpperCase() || "No Roll No"}</h3>

              <h4>+91{member.mobileNo}</h4>
              <br />
              <h4>{member.email}</h4>
            </div>
            <div className="buttons">
              <button onClick={openAddModal}>Add Contribution</button>
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
                formData={formData}
                handleChange={handleEditChange}
              />
            )}
            {isAddModalOpen && (
              <AddContribute
                closeModal={closeAddModal}
                handleSubmit={handleAdd}
                formData={contributionData}
                handleChange={handleAddChange}
              />
            )}
          </div>
          <div className="MemberProfile-body">
            <h1>Contribution :</h1>
            {console.log(member)}
            {member.contributions && member.contributions.length > 0 ? (
              member.contributions.map((contribution) => (
                <div className="contribut-container">
                  <div className="description">{contribution.description}</div>
                  <div className="description">{contribution.eventName}</div>
                  <div className="item">
                    {contribution.image ? (
                      <button
                        className="view-img"
                        onClick={() =>
                          openImageModal(contribution.image || "noimage")
                        }
                      >
                        View Image
                      </button>
                    ) : (
                      <button
                        className="disable-view-img"
                        disabled
                      >
                        View Image
                      </button>
                    )}
                  </div>
                  <div className="item">
                    {/* <button className="icon-button">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button> */}
                    <button className="icon-button delete" onClick={()=>handleDeleteContribution(contribution._id)}>
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
      </div>) : ("Hiiiii")}
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
