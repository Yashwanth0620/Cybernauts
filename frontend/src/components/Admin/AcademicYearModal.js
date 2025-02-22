import React,{useState} from 'react'
import '../styles/academicyearmodal.css'

import { useNavigate } from 'react-router-dom';
import MemberModel from './MemberModel';

export default function AcademicYearModal({ closeModal, MemberModel }) {
  const navigate = useNavigate();

  const handleClose = () => {
    closeModal();
    // navigate(-1)  // Optional navigation if you need it
  };

  const handleAddMember = () => {
    handleClose();
    MemberModel();
  };

  return (
    <>
      <div className="notspace"></div>
      <div className="AcademicYear">
        <div className="overlay">
          <div className="AskAcademic">
            <button className="close-button" onClick={handleClose}>✕</button>
           
            <div className="Bform">
              <div className="item">
                <h2>Enter Academic-Year:</h2>
               
               </div>
               <div className="item">

               </div>
               <div className="item">
              <p>"Use Format : 22XX-22XX"</p>
              </div>
               <div className="item">
                <p><label className="lt"><input type="text" placeholder="Example : 2024-2025" /></label></p>
               
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
    </>
  );
}

