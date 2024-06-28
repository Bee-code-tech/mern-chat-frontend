import React, { useState } from 'react';
import {  FaSpinner, FaPaperPlane } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';
import { MdCancel, MdPendingActions } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { FaCirclePlus } from 'react-icons/fa6';

const ConnectList = ({ users }) => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState({}); // Track loading state for each user
  const [sent, setSent] = useState({}); // Track which requests have been sent

  // Function to handle connect button click
  const handleConnect = async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/sendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ recipientId: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send connect request');
      }

      const data = await response.json();
      toast.success('Connect request sent');
      console.log('Connect request sent', data);
      setSent((prev) => ({ ...prev, [userId]: true }));
    } catch (error) {
      toast.error('Error sending connect request');
      console.error('Error sending connect request', error);
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <>
      {users.map(({ user, friendRequestStatus }) => (
        <div key={user._id} className='w-full flex items-center border-b justify-between h-auto lg:p-3 md:p-3 rounded-lg'>
          <div className="h-full flex items-center py-3 gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={user.profilePic} alt={user.username} className='object-cover w-full h-full' />
            </div>
            <div className="flex flex-col items-start justify-start h-full">
              <p className='text-lg font-bold'>{user.username}</p>
              <p className='font-thin text-[12px] lg:text-[14px] md:text-[14px] leading-6'>
                Connect with {user.username} now to get started
              </p>
            </div>
          </div>

          <div className="flex items-center h-full">
            {friendRequestStatus === 'none' && !sent[user._id] ? (
              <button
                onClick={() => handleConnect(user._id)}
                className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
                rounded-lg border-[#18BB0C] px-1 lg:px-3 md:px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
                hover:text-white text-sm flex items-center justify-center gap-2"
                disabled={loading[user._id]}
              >
                {loading[user._id] ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaCirclePlus />
                    <span className="hidden lg:block md:block">Connect</span>
                  </>
                )}
              </button>
            ) : sent[user._id] ? (
              <span className="border border-slate-400 text-slate-400 py-2 px-1 lg:px-2 md:px-2 gap-2 
              rounded-md capitalize flex items-center justify-center">
                <FaPaperPlane />
                <p className='hidden lg:block md:block'>Sent</p>
              </span>
            ) : (
              <span className={`border border-slate-400 text-slate-400 py-2 px-1 lg:px-2 md:px-2 gap-2 
              rounded-md capitalize flex items-center justify-center`}>
                {friendRequestStatus === 'pending' && <MdPendingActions />}
                {friendRequestStatus === 'accepted' && <FaCheckCircle />}
                {friendRequestStatus === 'rejected' && <MdCancel />}
                <p className='hidden lg:block md:block'>{friendRequestStatus}</p>
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ConnectList;
