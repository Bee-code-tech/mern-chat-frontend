import { Col, Row, Spin } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import picfallback from '../../assets/upload.png';
import { useAuthContext } from "../../context/AuthContext";
import { CiLock } from "react-icons/ci";
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const { userId } = useParams();
  const [galleryData, setGalleryData] = useState([]);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data/single/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setLoading(false);
        const data = await res.json();

        const images = data.filter((item) => item.image);
        setGalleryData(images);

      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    const fetchFriendshipStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/connect/friends/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        if (!res.ok) {
          toast.error('Error fetching friendship status');
        }

        const data = await res.json();
        setIsFriend(data.status);

        if (data.status === 'none' || data.status === 'rejected') {
          setShowModal(true);
        } else {
          setShowModal(false);
        }

      } catch (error) {
        console.error("Error fetching friendship status:", error);
      }
    };

    // Fetch gallery data immediately
    fetchGalleryData();

    // Set a timer for 30 seconds before checking friendship status
    const timer = setTimeout(() => {
      fetchFriendshipStatus();
      setTimerFinished(true);
    }, 30000);

    // Countdown logic
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(countdownInterval);
          return 0;
        }
      });
    }, 1000);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };

  }, [authUser.token, userId]);

  const handleConnect = async (id) => {
    setConnectLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/sendRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`
        },
        body: JSON.stringify({ recipientId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to send connect request');
      }
      toast.success('Connect request sent');
      setShowModal(false);
    
    } catch (error) {
      toast.error('Error sending connect request');
      console.error('Error sending connect request', error);
    } finally {
      setLoading(false);
      setConnectLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-4">
      {showModal && (
        <div className={`fixed z-[100] p-5 flex items-center justify-center ${showModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
          <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center ${showModal ? 'scale-1 opacity-1 duration-500' : 'scale-0 opacity-0 duration-150'}`}>
            <h3 className="text-2xl font-bold mb-4">Connect with this user</h3>
            <p className="mb-4">Connect with this user to view their gallery and message them.</p>
            <div className="flex justify-center gap-4 items-center mt-6">
              <button
                className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${connectLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => handleConnect(userId)}
                disabled={connectLoading}
              >
                {connectLoading ? <Spin /> : "Connect"}
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto mt-28 mb-10 flex flex-col items-start">
        <div onClick={handleBack}>
          <button className="btn bg-[#18BB0C] text-white">
            <span className="flex items-center">
              <FaAngleLeft color="white" size="1.2em" />
              <span>Back</span>
            </span>
          </button>
        </div>
        {isFriend !== 'accepted' && (
          <div className="mt-4 flex gap-4 rounded-lg p-4 bg-yellow-100 border-l-4 border-yellow-300 text-yellow-700">
            <div className="flex items-center">
              <FaInfoCircle className="mr-2" size="1.5em" />
              <div>
                <p>The user is not in your connect list. You can view the gallery content for <span className="font-bold">{countdown}</span> seconds. To have permanent access, please connect with the user.</p>
              </div>
            </div>
            <button
              className="mt-2 px-4 py-2 bg-[#18BB0C] text-white rounded hover:bg-green-600"
              onClick={() => setShowModal(true)}
            >
              Connect
            </button>
          </div>
        )}
      </div>

      <div className="border-2 border-[#18BB0C] rounded-xl p-3 container mx-auto">
        <div className="border-2 border-gray-300 p-5 rounded-xl">
          {galleryData.length === 0 ? (
            <div className="flex justify-center flex-col w-full items-center">
              <div className="h-[430px] w-full flex justify-center items-center">
                <img src={picfallback} alt="" className="h-[100%]" />
              </div>
              <h1 className="text-xl font-bold">No Gallery Found</h1>
            </div>
          ) : (
            <div className="rounded-lg py-2 bg-white">
              <Row gutter={[24, 16]}>
                {galleryData.map((item, index) => {
                  const key = `col-${index}`;
                  const userExists = isFriend === 'accepted' || !timerFinished;
                  return (
                    <Col
                      key={key}
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                      xl={{ span: 6 }}
                    >
                      <div className="relative">
                        <Link to={userExists ? `/galleryDetails/${item?._id}` : '#'}>
                          <div className="card card-compact rounded w-full shadow-xl">
                            <figure>
                              <img src={item?.image} className="rounded-lg w-full h-full object-cover aspect-[1.45]" />
                            </figure>
                          </div>
                        </Link>
                        {!userExists && (
                          <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <CiLock className="text-white text-4xl" />
                          </div>
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
