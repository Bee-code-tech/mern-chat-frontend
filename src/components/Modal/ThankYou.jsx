import React from 'react'

const ThankYou = ({isOpen, onClose, img}) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="bg-green-500 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
          <img src={img} alt="Placeholder" className="mb-4 mx-auto" />
          <button 
            onClick={onClose} 
            className="bg-white text-green-500 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
}

export default ThankYou



