// Modal.js
import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
      <div style={{ backgroundColor: 'white', padding: '20px' }}>
        {children}
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
