import moment from "moment";
import { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const NotificationCard = ({ data }) => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false); // General loading state
  const [loadingButton, setLoadingButton] = useState(null); // Specific button loading state
  const [buttonState, setButtonState] = useState(data.status);

  const handleAcceptRequest = async () => {
    setLoading(true);
    setLoadingButton('accept'); // Indicate that the accept button is loading
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/acceptRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ requesterId: data.friendId, notificationId: data._id }), // Use data.friendId
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      toast.success('Friend request accepted');
      setButtonState('accepted');
    } catch (error) {
      toast.error('Error accepting friend request');
      console.error('Error accepting friend request:', error);
    } finally {
      setLoading(false);
      setLoadingButton(null); // Reset button loading state
    }
  };

  const handleRejectRequest = async () => {
    setLoading(true);
    setLoadingButton('reject'); // Indicate that the reject button is loading
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/rejectRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ requesterId: data.friendId, notificationId: data._id }), // Use data.friendId
      });

      if (!response.ok) {
        throw new Error('Failed to reject friend request');
      }

      toast.success('Friend request rejected');
      setButtonState('rejected');
    } catch (error) {
      toast.error('Error rejecting friend request');
      console.error('Error rejecting friend request:', error);
    } finally {
      setLoading(false);
      setLoadingButton(null); // Reset button loading state
    }
  };

  return (
    <div className="rounded-lg px-2 py-4 border">
      {data.type !== undefined ? (
        data.type ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl">{data.name} Posted A Comment</h2>
            </div>
            <div className="flex gap-4 my-4">
              <img
                className="rounded-full size-16"
                src={data.profilePic}
                alt="profileAvatar"
              />
              <div>
                <p className="text-[#666666] font-medium">
                  <span className="font-bold">Comment:</span> {data.comment}
                </p>
                <p className="text-[#999999] font-medium mt-4 text-sm">
                  {moment(data.createdAt).calendar()}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                className="rounded-full size-12"
                src={data.profilePic}
                alt="profileAvatar"
              />
              <p className="text-[#666666] font-medium">
                {data.name} sent you a friend request
              </p>
            </div>
            <div className="flex gap-4">
              {buttonState === 'pending' ? (
                <>
                  <button
                    onClick={handleAcceptRequest}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition ease-in-out duration-300"
                    disabled={loading && loadingButton !== 'reject'} // Disable if general loading or specific button is loading
                  >
                    {loading && loadingButton === 'accept' ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span className="hidden sm:inline">Accept</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleRejectRequest}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition ease-in-out duration-300"
                    disabled={loading && loadingButton !== 'accept'} // Disable if general loading or specific button is loading
                  >
                    {loading && loadingButton === 'reject' ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <>
                        <FaTimesCircle />
                        <span className="hidden sm:inline">Reject</span>
                      </>
                    )}
                  </button>
                </>
              ) : buttonState === 'accepted' ? (
                <button className="flex items-center gap-2 lg:gap-4 bg-gray-300 text-gray-600 px-2 lg:px-4 py-2 rounded-lg shadow-md cursor-not-allowed" disabled>
                  <FaCheckCircle className="lg:mr-2" />
                  <span className="hidden sm:inline">Accepted</span>
                </button>
              ) : (
                <button className="flex items-center lg:gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg shadow-md cursor-not-allowed" disabled>
                  <FaTimesCircle className="lg:mr-2" /> 
                  <span className="hidden sm:inline">Rejected</span>
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">{data.name} Posted A Comment</h2>
          </div>
          <div className="flex gap-4 my-4">
            <img
              className="rounded-full size-16"
              src={data.profilePic}
              alt="profileAvatar"
            />
            <div>
              <p className="text-[#666666] font-medium">
                <span className="font-bold">Comment:</span> {data.comment}
              </p>
              <p className="text-[#999999] font-medium mt-4 text-sm">
                {moment(data.createdAt).calendar()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCard;
