// Modal.jsx
import React from 'react';
import './Modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Modal = ({ show, handleClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thank You for visiting our website!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" class="btn btn-outline-info" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
