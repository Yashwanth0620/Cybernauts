import React, { useState } from "react";
import "../styles/Addmember.css";
import pp from "../../assets/pp.jpg";
import MemberModel from "./MemberModel";

export default function AddMember() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chairperson, setChairPerson] = useState([{name: "Vamshi",
    rollNo: "x3",
    designation: "",
    description: "ghjj",
    image: "",}]);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    designation: "",
    description: "",
    image: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({
      name: "",
      rollNo: "",
      designation: "",
      description: "",
      image: "",
    });
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({
      name: "",
      rollNo: "",
      designation: "",
      description: "",
      image: "",
    });
    closeModal();
  };
  return (
    <div className="members">
      <div className="head">
        <h1>Our Team</h1>
        <h2>Meet the passionate minds of Cybernauts</h2>
      </div>

      <div className="search-bar">
        <form action="/search" method="GET">
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search by name, date, description etc"
          />
        </form>
        <select>
          <option value="" disabled selected hidden>
            Filter
          </option>
          <option value="all">All</option>
          <option value="hackathon">Hackathon</option>
          <option value="seminar">Seminar</option>
          <option value="workshop">Workshop</option>
          <option value="webinar">Webinar</option>
          <option value="tech-talk">Tech Talk</option>
        </select>
        <i className="fas fa-chevron-down" type="filter"></i>
      </div>

      <div className="chairperson">
        <div className="section-label">
          <span>Chariperson</span>
        </div>
    {console.log(chairperson.length)}
        {chairperson.length >0 && chairperson.map((member)=>(
        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={(member.image) ? member.image : pp} alt="" />
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
        </div>))}
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
          <span>Vice Chariperson</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
                <div className="personal-details">
                  <h4>Team Member</h4>
                  <p>One liner for each member...</p>
                </div>
                <div className="member-img-overlay"></div>
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secretary">
        <div className="section-label">
          <span>Secretary & Vice Secretary</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="finance">
        <div className="section-label">
          <span>Finance</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="documentation">
        <div className="section-label">
          <span>Documentation</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="technical">
        <div className="section-label">
          <span>Technical</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="graphics">
        <div className="section-label">
          <span>Graphics</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="outreach">
        <div className="section-label">
          <span>Outreach</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-management">
        <div className="section-label">
          <span>Event Management</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="executive-Boys">
        <div className="section-label">
          <span>Executive-Boys</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="executive-Girls">
        <div className="section-label">
          <span>Executive-Girls</span>
        </div>

        <div className="member-body">
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-desc">
              <div className="member-img">
                <img src={pp} alt="" />
              </div>
              <div className="desc-body">
                <h2>Y.V.Sridhar</h2>
              </div>
            </div>
          </div>
          <div className="team">
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
            <div className="member">
              <div className="member-desc">
                <div className="member-img">
                  <img src={pp} alt="" />
                </div>
                <div className="desc-body">
                  <h2>Y.V.Sridhar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
