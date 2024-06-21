import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import { useAuthContext } from '../../context/AuthContext';

const RequestList = ({friendRequests}) => {
  const {authUser} = useAuthContext()

  const handleAccept = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/acceptRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ requesterId : userId }),
      });
      const data = await response.json();
      console.log('Connect request sent', data);
      // Handle the response, e.g., updating the UI or state
    } catch (error) {
      console.error('Error sending connect request', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/rejectRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${authUser.token}`
          
        },
        body: JSON.stringify({ requesterId : userId }),
      });
      const data = await response.json();
      console.log('Connect request sent', data);
      // Handle the response, e.g., updating the UI or state
    } catch (error) {
      console.error('Error sending connect request', error);
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
            {request.status === 'pending' ? (
              <>
                <button onClick={ () => handleAccept(request.requester._id)}
                  className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
                    rounded-lg border-[#18BB0C] px-1 lg:px-3 md:px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
                    hover:text-white text-sm flex items-center justify-center gap-2"
                >
                  <FaCirclePlus />
                  <span className="hidden lg:block md:block">Accept</span>
                </button>
                <button onClick={() => handleReject(request.requester._id)}
                  className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
                    rounded-lg border-red-500 px-1 lg:px-3 md:px-3 py-2 text-red-500 hover:bg-red-500
                    hover:text-white text-sm flex items-center justify-center gap-2"
                >
                  <MdCancel />
                  <span className="hidden lg:block md:block">Reject</span>
                </button>
              </>
            ) : (
              <p className={`text-sm font-bold ${request.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default RequestList;