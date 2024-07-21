import moment from "moment";
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';

const NotificationCard = ({ data }) => {
  const { authUser } = useAuthContext(); // Make sure authUser is available
  const [loading, setLoading] = useState(false);

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/acceptRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ requesterId: data._id }), // Adjust according to your API's expected format
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      toast.success('Friend request accepted');
      // Optionally refresh notifications or update state
    } catch (error) {
      toast.error('Error accepting friend request');
      console.error('Error accepting friend request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg p-6 border">
      {/* Check for type or use a fallback */}
      {data.type !== undefined ? (
        data.type ? (
          // Detailed notification card
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
          // Friend request card (when type is false)
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="rounded-full size-16"
                src={data.profilePic}
                alt="profileAvatar"
              />
              <p className="text-[#666666] font-medium">
                {data.name} sent you a friend request
              </p>
            </div>
            <button
              onClick={handleAcceptRequest}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition ease-in-out duration-300"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                'Accept'
              )}
            </button>
          </div>
        )
      ) : (
        // Fallback for notifications without a type
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
