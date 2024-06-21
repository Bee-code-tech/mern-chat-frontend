import React, { useState } from 'react';
import {  FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaCirclePlus } from 'react-icons/fa6';

const RequestList = ({ friendRequests }) => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState({});
  const [status, setStatus] = useState({});

  const handleAccept = async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: 'accepting' }));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/acceptRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ requesterId: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept connect request');
      }

      const data = await response.json();
      toast.success('Connect request accepted');
      console.log('Connect request accepted', data);
      setStatus((prev) => ({ ...prev, [userId]: 'accepted' }));
    } catch (error) {
      toast.error('Error accepting connect request');
      console.error('Error accepting connect request', error);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleReject = async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: 'rejecting' }));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/rejectRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ requesterId: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject connect request');
      }

      const data = await response.json();
      toast.success('Connect request rejected');
      console.log('Connect request rejected', data);
      setStatus((prev) => ({ ...prev, [userId]: 'rejected' }));
    } catch (error) {
      toast.error('Error rejecting connect request');
      console.error('Error rejecting connect request', error);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <>
      {friendRequests.map((request) => (
        <div key={request._id} className='w-full flex items-center border-b justify-between h-auto lg:p-3 md:p-3 rounded-lg'>
          <div className="h-full flex items-center py-3 gap-4">
            <div className="w-14 rounded-full">
              <img src={request.requester.profilePic} alt={`${request.requester.fullName}'s profile`} />
            </div>
            <div className="flex flex-col items-start justify-start h-full">
              <p className='text-lg font-bold'>{request.requester.fullName}</p>
              <p className='font-thin text-[12px] lg:text-[14px] md:text-[14px] leading-6'>
                {request.requester.fullName} wants to connect with you.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center h-full">
            {request.status === 'pending' && !status[request.requester._id] ? (
              <>
                <button
                  onClick={() => handleAccept(request.requester._id)}
                  className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
                  rounded-lg border-[#18BB0C] px-1 lg:px-3 md:px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
                  hover:text-white text-sm flex items-center justify-center gap-2"
                  disabled={loading[request.requester._id] === 'accepting'}
                >
                  {loading[request.requester._id] === 'accepting' ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaCirclePlus />
                      <span className="hidden lg:block md:block">Accept</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleReject(request.requester._id)}
                  className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
                  rounded-lg border-red-500 px-1 lg:px-3 md:px-3 py-2 text-red-500 hover:bg-red-500
                  hover:text-white text-sm flex items-center justify-center gap-2"
                  disabled={loading[request.requester._id] === 'rejecting'}
                >
                  {loading[request.requester._id] === 'rejecting' ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <MdCancel />
                      <span className="hidden lg:block md:block">Reject</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <span className="flex items-center gap-2 text-sm font-bold">
                {request.status === 'accepted' ? (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-green-500">Accepted</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    <span className="text-red-500">Rejected</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default RequestList;
