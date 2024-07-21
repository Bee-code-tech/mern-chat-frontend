import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ConnectModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ConnectModal;

