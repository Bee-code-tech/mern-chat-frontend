import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ThankYou = ({ isOpen, onClose, img, id, name, sendThanks }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendThanks = async () => {
    setLoading(true);
    try {
      await sendThanks();
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Error sending thanks:", error);
    }
  };

  return (
    <div className="w-fit max-w-5xl container mx-auto z-50">
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm duration-100 cursor-pointer" onClick={onClose}>
        <div 
          className="bg-green-500 relative z-100 flex items-center justify-center flex-col w-[350px] p-10 rounded-lg" 
          onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center justify-center">
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full">
              <img src={img} alt="Placeholder" className="block object-cover" />
            </div>
            <h2 className="text-white text-xl my-4">{name}</h2>
          </div>
          <Link 
            to={`/community/userProfile/${id}`}
            className="bg-white text-green-500 px-4 py-2 mb-12 mt-2 rounded"
          >
            View User Biopic
          </Link>
          <button 
            onClick={handleSendThanks}
            className="bg-transparent border border-1 border-white text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Thank you 🙏'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
