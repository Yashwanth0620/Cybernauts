import React, { useState, useEffect } from "react";
import "./styles/Members.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const pp = require("../assets/pp.jpg");

export default function Members() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [originalMembers, setOriginalMembers] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState();
  const [filterYear, setFilterYear] = useState();
  const [searchTerm, setSearchTerm] = useState("");
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

  const fetchYearMembers = async () => {
    try {
      console.log(filterYear);
      const response = await axios.get(
        `http://localhost:3001/members/${filterYear}`
      );
      setOriginalMembers(response.data);
      setMembers(response.data);
      // setYear(response.data.year);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    if (filterYear) {
      fetchYearMembers();
    }
  }, [filterYear]);

  const handleYear = (e) => {
    console.log(e.target.value);
    setFilterYear(e.target.value);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/members");
        setOriginalMembers(response.data.members);
        setMembers(response.data.members);
        setYear(response.data.year);
        setFilterYear(response.data.year);
        console.log(response.data);

        const response2 = await axios.get(
          "http://localhost:3001/members/years"
        );
        setYears(response2.data);
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(e.target.value);
    const newMembers = originalMembers.filter((member) => {
      const memberDetails = `${member.name && member.name.toLowerCase()} ${
        member.rollNo && member.rollNo.toLowerCase()
      } ${member.designation && member.designation.toLowerCase()} ${
        member.description && member.description.toLowerCase()
      } ${member.position && member.position.toLowerCase()} ${
        member.mobileNo
      } ${member.email && member.email.toLowerCase()}`;
      return memberDetails.includes(inputValue.toLowerCase());
    });
    console.log(inputValue);
    setMembers(newMembers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMembers = originalMembers.filter((member) => {
      const memberDetails = `${member.name && member.name.toLowerCase()} ${
        member.rollNo && member.rollNo.toLowerCase()
      } ${member.designation && member.designation.toLowerCase()} ${
        member.description && member.description.toLowerCase()
      } ${member.position && member.position.toLowerCase()} ${
        member.mobileNo
      } ${member.email && member.email.toLowerCase()}`;
      return memberDetails.includes(searchTerm.toLowerCase());
    });
    setMembers(newMembers);
  };

  return (
    <div className="members">
      <div className="head">
        <div className="head-container">
          <div className="head-text">
            <h1>Our Team</h1>
            <h2>Meet the passionate minds of Cybernauts</h2>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <span className="search-icon">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            id="search"
            placeholder="Search by name, designation etc"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <select value={filterYear} onChange={handleYear}>
          {/* <option value={year} disabled selected hidden>
            {year}
          </option> */}
          {years &&
            years.length > 0 &&
            years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          <i className="fas fa-chevron-down" type="filter"></i>
        </select>
      </div>

      <div className="chairperson">
        <div className="section-label">
          <span> Chariperson </span>
        </div>
        {members.length > 0 &&
          members
            .filter((member) => member.designation === "chairperson")
            .map((member) => (
              <div className="member-body">
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                    <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                      {/* <p>
                        {member.rollNo} <br />
                        {member.description}
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="vice-chairperson">
        <div className="section-label">
          <span>Vice Chariperson</span>
        </div>
        <div className="member-body">
          {members.length > 0 &&
            members
              .filter((member) => member.designation === "vice-chairperson")
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="secretary">
        <div className="section-label">
          <span>Secretary & Vice-Secretary</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter((member) => member.designation.includes("secretary"))
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="finance">
        <div className="section-label">
          <span>Finance</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter((member) => member.designation === "finance")
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="documentation">
        <div className="section-label">
          <span>Documentation</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter((member) => member.designation === "documentation")
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="technical">
        <div className="section-label">
          <span>Technical</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "technical" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "technical" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "technical" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="graphics">
        <div className="section-label">
          <span>Graphics</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "graphics" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "graphics" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "graphics" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="outreach">
        <div className="section-label">
          <span>Outreach</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "outreach" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "outreach" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "outreach" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="event-management">
        <div className="section-label">
          <span>Event Management</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "event-management" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "event-management" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "event-management" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="executive-Boys">
        <div className="section-label">
          <span>Executive-Boys</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "executive-Boys" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "executive-Boys" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "executive-Boys" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="executive-Girls">
        <div className="section-label">
          <span>Executive-Girls</span>
        </div>

        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "executive-Girls" &&
                  member.position === "lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          {members.length > 0 &&
            members
              .filter(
                (member) =>
                  member.designation === "executive-Girls" &&
                  member.position === "co-lead"
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation + " " + member.position}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                    </div>
                  </div>
                </div>
              ))}
          <div className="team">
            {members.length > 0 &&
              members
                .filter(
                  (member) =>
                    member.designation === "executive-Girls" &&
                    member.position === "member"
                )
                .map((member) => (
                  <div className="member">
                    <div className="member-desc">
                      <div className="member-img">
                        <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                        <div className="personal-details">
                          <h4>
                            {member.designation + " team " + member.position}
                          </h4>
                          <p>{member.description}</p>
                        </div>
                        <div className="member-img-overlay"></div>
                      </div>
                      <div className="desc-body">
                        <h2>{member.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="additional-expertise">
        <div className="section-label">
          <span> Additional Expertise Team</span>
        </div>
        <div className="member-body">
          {members.length > 0 &&
            members
              .filter(
                (member) => !standardDesignations.includes(member.designation)
              )
              .map((member) => (
                <div className="member">
                  <div className="member-desc">
                    <div className="member-img">
                      <img
                        src={member.image ? member.image : pp}
                        referrerPolicy="no-referrer"
                        style={{ width: "auto", height: "100%" }}
                        alt=""
                      />
                      <div className="personal-details">
                        <h4>{member.designation}</h4>
                        <p>{member.description}</p>
                      </div>
                      <div className="member-img-overlay"></div>
                    </div>
                    <div className="desc-body">
                      <h2>{member.name}</h2>
                      {/* <p>
                        {member.rollNo} <br />
                        {member.description}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
