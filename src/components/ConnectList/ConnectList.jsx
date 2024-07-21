import React, { useState } from 'react';
import { FaSpinner, FaUserMinus } from 'react-icons/fa';
import { MdPendingActions, MdCancel } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import ConnectModal from '../Modal/ConnectModal';
import { FaCirclePlus } from 'react-icons/fa6';

const ConnectList = ({ users }) => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState({});
  const [sent, setSent] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      setSent((prev) => ({ ...prev, [userId]: true }));
      setModalOpen(false);
    } catch (error) {
      toast.error('Error sending connect request');
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleUnfollow = async (userId) => {
    setLoading((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to unfollow');
      }

      const data = await response.json();
      toast.success('Unfollowed successfully');
      setSent((prev) => ({ ...prev, [userId]: false }));
      setModalOpen(false);
    } catch (error) {
      toast.error('Error unfollowing');
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const openModal = (user, status) => {
    setSelectedUser({ ...user, status });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  return (
    <>
      {users.map(({ user, friendRequestStatus }) => (
        <div key={user._id} className='w-full flex items-center border-b justify-between h-auto lg:p-3 md:p-3 rounded-lg'>
          <div
            className="h-full flex items-center py-3 gap-4 cursor-pointer"
            onClick={() => openModal(user, friendRequestStatus)}
          >
            <div className="relative w-14 h-14 rounded-full  flex-shrink-0">
              <img src={user.profilePic} alt={user.username} className='object-cover rounded-full w-full h-full' />
              <div className={`status-indicator ${friendRequestStatus}`}></div>
            </div>
            <div className="flex flex-col items-start justify-start h-full">
              <p className='text-lg font-bold'>{user.username}</p>
              <p className='font-thin text-[12px] lg:text-[14px] md:text-[14px] leading-6'>
                Connect with {user.username} now to get started
              </p>
            </div>
          </div>
        </div>
      ))}

      <ConnectModal isOpen={modalOpen} onClose={closeModal}>
        {selectedUser && (
          <>
            <h2 className="text-lg font-bold mb-4">Connect with {selectedUser.username}</h2>
            <p className="mb-4">Connect with {selectedUser.username} now to get started.</p>
            {selectedUser.status === 'pending' ? (
              <button
                className="bg-gray-400 flex   items-center justify-center text-white px-4 py-2 rounded-lg shadow-md float-right cursor-not-allowed"
                disabled
              >
                <MdPendingActions className="mr-2" />
                Request Sent
              </button>
            ) : selectedUser.status === 'accepted' ? (
              <button
                onClick={() => handleUnfollow(selectedUser._id)}
                className="bg-red-500 flex  items-center justify-center text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition ease-in-out duration-300 float-right"
                disabled={loading[selectedUser._id]}
              >
                {loading[selectedUser._id] ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaUserMinus className="mr-2" />
                    Disconnect
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleConnect(selectedUser._id)}
                className="bg-green-500 flex items-center justify-center text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition ease-in-out duration-300 float-right"
                disabled={loading[selectedUser._id]}
              >
                {loading[selectedUser._id] ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaCirclePlus className="mr-2" />
                    Send Request
                  </>
                )}
              </button>
            )}
          </>
        )}
      </ConnectModal>
    </>
  );
};

export default ConnectList;
