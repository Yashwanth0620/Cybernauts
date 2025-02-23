import React from "react";
import "../styles/MemberProfile.css";
import pp from "../../assets/pp.jpg";
import { useLocation } from "react-router-dom";
export default function MemberProfile() {
  const location = useLocation();
  const {member,filterYear} = location.state || {member:{},filterYear:""};
  // console.log(member,filterYear)
  return (
    <>
      <div className="MemberProfile">
        <div className="MemberProfile-container">
          <div className="MemberProfile-main">
            <h1>Designation</h1>
            <img src={pp} alt = "photo"></img>
            <div className="items">
              <h3>Name : {member.name}</h3>
              <h3>Roll No : {member.rollNo}</h3>
              <h3>Year : {filterYear}</h3>
              <h3>Phone no : {member.mobileNo}</h3>
              <h3>Email : {member.email}</h3>
            </div>
          </div>
          <div className="MemberProfile-body">
            <h1>Contribution :</h1>
            {member.contributions &&
              member.contributions.length > 0 ? 
              member.contributions.map((contribution) => (
                <div className="contribut-container">
                  <div className="description">{contribution.description}</div>
                  <div className="description">{contribution.eventName}</div>
                  <div className="item">
                    <button className="view-img">View-image</button>
                  </div>
                  <div className="item">
                    <button className="icon-button">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="icon-button delete">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
              : <h1 className="no-contribution">No Contributions</h1>
            }

            
            
          </div>
        </div>
      </div>
    </>
  );
}
