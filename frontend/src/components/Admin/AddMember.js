import React, { useState, useEffect } from "react";
import "../styles/Addmember.css";
import pp from "../../assets/pp.jpg";
import MemberModel from "./MemberModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AddMember() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    designation: "",
    description: "",
    mobileNo: "",
    email: "",
    position: "member",
  });
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const navigate=useNavigate()
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({
      name: "",
      rollNo: "",
      designation: "",
      description: "",
      mobileNo: "",
      email: "",
      position: "member",
      image: "",
    });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/members/${year}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const standardDesignations = [
    "chairperson",
    "vice-chairperson",
    "secretary",
    "vice-secretary",
    "finance",
    "documentation",
    "technical",
    "graphics",
    "outreach",
    "event-management",
    "executive-Boys",
    "executive-Girls",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.year = year;

    const form = new FormData();
    form.append("name", formData.name);
    form.append("rollNo", formData.rollNo);
    form.append("designation", formData.designation);
    form.append("description", formData.description);
    form.append("position", formData.position);
    form.append("mobileNo", formData.mobileNo);
    form.append("email", formData.email);
    form.append("year", year);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      // Make the API call
      console.log("Form Data:", formData);
      const response = await axios.post(
        `http://localhost:3001/admin/members/add/`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // console.log("Member added successfully:", response.data);
      setMembers(response.data);
      toast.success("Member added successfully");

      setFormData({
        name: "",
        rollNo: "",
        designation: "",
        description: "",
        mobileNo: "",
        email: "",
        position: "member",
        image: "",
      });
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add member..!");
      // alert("Failed to add the event. Please try again.");
    }
  };

  const handleNavigate = (member,year) => {
    // console.log(member,year)

    navigate("/admin/view-members/profile", { state: {member,year} }); 
  };

  return (
    <>
      <div className="members">
        <div className="head">
          <h1>Our Team</h1>
          <h2>Meet the passionate minds of Cybernauts</h2>
        </div>
        {console.log(members)}
        <div className="chairperson">
          <div className="section-label">
            <span>Chariperson</span>
          </div>
          <div className="member-body">
            {members &&
              members.length > 0 &&
              members
                .filter((member) => member.designation === "chairperson")
                .map((member) => (
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "chairperson";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="vice-chairperson">
          <div className="section-label">
            <span>Vice Chairperson</span>
          </div>

          {members &&
            members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "vice-chairperson")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        {console.log(member.image)}
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          description : {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "vice-chairperson";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="secretary">
          <div className="section-label">
            <span>Secretary</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "secretary")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        {console.log(member.image)}
                        <img
                          src={member.image ? member.image : pp}
                          alt="image"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          
                        />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "secretary";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="vice-secretary">
          <div className="section-label">
            <span>Vice Secretary</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "vice-secretary")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "vice-secretary";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="finance">
          <div className="section-label">
            <span>Finance</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "finance")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "finance";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="documentation">
          <div className="section-label">
            <span>Documentation</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "documentation")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "documentation";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="technical">
          <div className="section-label">
            <span>Technical</span>
          </div>
          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "technical")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "technical";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="graphics">
          <div className="section-label">
            <span>Graphics</span>
          </div>
          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "graphics")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "graphics";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="outreach">
          <div className="section-label">
            <span>Outreach</span>
          </div>
          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "outreach")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "outreach";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="event-management">
          <div className="section-label">
            <span>Event Management</span>
          </div>
          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "event-management")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "event-management";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="executive-Boys">
          <div className="section-label">
            <span>Executive-Boys</span>
          </div>
          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "executive-Boys")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "executive-Boys";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>

        <div className="executive-Girls">
          <div className="section-label">
            <span>Executive-Girls</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter((member) => member.designation === "executive-Girls")
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="Addmember-container">
            <div
              className="Addmember-btn"
              onClick={() => {
                openModal();
                formData.designation = "executive-Girls";
              }}
            >
              Add+
            </div>
          </div>
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="additional-expertise">
          <div className="section-label">
            <span>Additional-Expertise Team</span>
          </div>

          {members &&
            members.length > 0 &&
            members
              .filter(
                (member) => !standardDesignations.includes(member.designation)
              )
              .map((member) => (
                <div className="member-body">
                  <div className="member" onClick={()=>handleNavigate(member,year)}>
                    <div className="member-desc">
                      <div className="member-img">
                        <img src={member.image ? member.image : pp} alt="" />
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                        <p>
                          {member.rollNo} <br />
                          Description : {member.description}
                          <br />
                          position : {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          {isModalOpen && (
            <MemberModel
              closeModal={closeModal}
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>
        <div className="Addmember-container">
          <div
            className="Addmember-btn"
            onClick={() => {
              openModal();
              formData.designation = "chairperson";
            }}
          >
            Add+
          </div>
        </div>
        {isModalOpen && (
          <MemberModel
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}
