import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard';
import picf from '../../assets/note.png';
import NotificationSkeleton from '../../components/skeletons/NotificationSkeleton';
import { useAuthContext } from '../../context/AuthContext';

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });

        const data = await res.json();
        console.log(data.data);
        setNotifications(data.data.notifications);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [authUser.token]);

  console.log(notifications);

  if (loading) {
    return (
      <div className="flex items-start flex-col gap-4 justify-center mt-8" role="status">
        {[...Array(3)].map((_, idx) => <NotificationSkeleton key={idx} />)}
      </div>
    );
  }

  return (
    <section className="space-y-5 px-2 mt-12">
      {notifications.length > 0 ? (
        <div className="space-y-8">
          {notifications.map((notification, idx) => (
            <NotificationCard 
              key={idx}
              data={notification}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-auto mt-12 justify-center flex-col w-full items-center">
          <div className="h-full overflow-hidden md:w-[50%] lg:w-[60%] w-[100%] mx-auto flex justify-center items-center">
            <img src={picf} alt="" className="w-[100% ]  object-cover" />
          </div>
          <h1 className="text-xl -mt-32 font-bold">You have no notifications yet</h1>
        </div>
      )}
    </section>
  );
};

export default Notification;
