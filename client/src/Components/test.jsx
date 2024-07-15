// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, message }) => {
  if (!show) return null;

  return (
  

    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notification</h2>
        <p>{message}</p>
        <button onClick={handleClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
