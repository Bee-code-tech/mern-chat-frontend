import React from "react";
import { createPortal } from "react-dom";

const ConnectRequestModal = ({ username, isOpen, onRequestClose, onAccept, onReject }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{`${username} wants to connect`}</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Connect
          </button>
          <button
            onClick={onReject}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConnectRequestModal;
