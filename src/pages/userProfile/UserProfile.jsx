import { Col, Row } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaLock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import picfallback from '../../assets/upload.png';
import pic from '../../assets/demo.avif';
import { useAuthContext } from "../../context/AuthContext";
import { CiLock } from "react-icons/ci";

const UserProfile = () => {
  const { userId } = useParams();
  const [gallerySingleData, setGallerySingleData] = useState({ image: pic });
  const [galleryData, setGalleryData] = useState([
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic },
    { image: pic }
  ]);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const mockData = [
    { name: "User1", id: "1" },
    { name: "User2", id: "2" },
    { name: "User3", id: "3" },
  ];

  useEffect(() => {
    const userExists = mockData.some(user => user.id === authUser._id);
    if (!userExists) {
      setShowModal(true);
    }
  }, [authUser._id]);

  const handleConnect = () => {
    console.log("Connect with the user");
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-4">
      {showModal && (
        <div className={`fixed z-[100] p-5 flex items-center justify-center ${showModal ? 'visible opacity-100' : 'invisible opacity-0'}  inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
          <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center ${showModal ? 'scale-1 opacity-1 duration-500' : 'scale-0 opacity-0 duration-150'}`}>
            <h3 className="text-2xl font-bold mb-4">Connect with this user</h3>
            <p className="mb-4">Connect with this user to view their gallery and message them.</p>
            <div className="flex justify-center gap-4 items-center mt-6">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleConnect}
              >
                Connect
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

      <div className="container mx-auto mt-28 mb-10 flex justify-start items-center">
        <Link to="/community/topics">
          <button className="btn bg-[#18BB0C] text-white">
            <span className="flex items-center">
              <FaAngleLeft color="white" size="1.2em" />
              <span>Back</span>
            </span>
          </button>
        </Link>
      </div>

      <div className="border-2 border-[#18BB0C] rounded-xl p-3 container mx-auto">
        <div className="border-2 border-gray-300 p-5 rounded-xl">
          {!gallerySingleData?.image ? (
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
                  const userExists = mockData.some(user => user.id === authUser._id);
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
                              <img src={item?.image} className="rounded-lg" />
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
