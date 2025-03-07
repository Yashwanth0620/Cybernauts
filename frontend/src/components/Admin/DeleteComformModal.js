import React, { useState } from "react";
import "../styles/DeleteConform.css";

import { useNavigate } from "react-router-dom";

export default function DeleteComformModal({  closeModal, handleDelete }) {


  const handleClose = () => {
    closeModal();
  };

  const ConfirmDelete = () => {
    handleDelete();
    closeModal()
  };

  return (
    <>
    <div className="DeleteModel">
      <div className="overlay">
        <div className="Wrongdel">
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>

          <div className="Delmsg">
            <div className="item">
              <h1 className="w">✕</h1>
              <h1>Are You Sure?</h1>
            </div>

            <div className="item">
              <p>Do you want to delete this record? This action cannot be undone.</p>
            </div>

            <div className="butn">
              <div className="bnt2">
                <button onClick={handleClose}>Cancel</button>
              </div>
              <div className="bnt1">
                <button onClick={ConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}