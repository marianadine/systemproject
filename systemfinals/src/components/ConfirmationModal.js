import React from 'react';
import './components_css/modalstyle.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Checkout</h2>
        <p>Are you sure you want to proceed to checkout?</p>
        <button className='cancelbtn' onClick={onClose}>Cancel</button>
        <button className='confirmbtn' onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
