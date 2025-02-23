import React, { useState } from "react";
import "../styles/academicyearmodal.css";

import { useNavigate } from "react-router-dom";
import MemberModel from "./MemberModel";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewAcademicModel({
  years,
  newyear,
  handleNewyear,
  closeNewModal,
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    closeNewModal();
  };

  const handleAddMember = () => {
      if(years.includes(newyear)){
          toast.error("Year already existed...!")
          return ;
        }
        if(!(/^20\d{2}-20\d{2}$/.test(newyear))){
            toast.error("Format Not Matched")
            return ;
        }
    handleClose();
    navigate(`/admin/add-member?year=${newyear}`);
  };
  console.log(years)
  console.log(newyear)

  return (
    <>
      <div className="notspace"></div>
      <div className="AcademicYear">
        <div className="overlay">
          <div className="AskAcademic">
            <button className="close-button" onClick={handleClose}>
              ✕
            </button>

            <div className="Bform">
              <div className="item">
                <h2>Enter new Academic-Year:</h2>
              </div>
              <div className="item"></div>
              <div className="item">
                <p>"Use Format : 20XX-20XX"</p>
              </div>
              <div className="item">
                <p>
                  <label className="lt">
                    <input type="text" placeholder="Example : 2024-2025" 
                        value={newyear}
                        onChange={handleNewyear}
                    />
                  </label>
                </p>
              </div>

              <div className="butn">
                <div className="bnt2">
                  <button onClick={handleAddMember}>Continue &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
