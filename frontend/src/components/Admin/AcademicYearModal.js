import React, { useState } from "react";
import "../styles/academicyearmodal.css";

import { useNavigate } from "react-router-dom";

export default function AcademicYearModal({ closeModal, years, handleNewyear, setYears, newyear,openNewModal,closeNewModal }) {
  const navigate = useNavigate();

  const handleClose = () => {
    closeModal();
  };
  const handleNewModal = () => {
    handleClose();
    openNewModal();
  };

  const handleAddMember = () => {
    handleClose();
    navigate(`/admin/add-member?year=${newyear}`);
  };

  return (
    <div className="AcademicYear">
      <div className="overlay">
        <div className="AskAcademic">
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>

          <div className="Bform">
            <div className="item">
              <h2>Choose Academic-Year:</h2>
            </div>

            <div className="item">
              <select name="year" value={newyear} onChange={handleNewyear} required>
                <option disabled selected hidden>
                  Choose
                </option>
                {years.length > 0 &&
                  years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>

            <div className="butn">
              <div className="bnt2">
                <button onClick={handleNewModal} >Create new Year</button>
              </div>
              <div className="bnt2">
                <button onClick={handleAddMember} disabled={!newyear}>
                  Continue &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
