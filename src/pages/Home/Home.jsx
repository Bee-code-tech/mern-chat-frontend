import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { CiHeart } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";

const Home = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      const videos = data.filter((item) => item.video);
      const images = data.filter((item) => item.image);
      setVideoData(videos);
      setImageData(images);
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };
  const [topics, setTopics] = useState([]);
  const { loading, conversations } = useGetConversations();

  console.log(conversations, 'conversions');

  const getTopics = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    setTopics(data.data);
  };

  useEffect(() => {
    getTopics();
  }, []);

  // console.log(topics, 'topics from home page');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-[100px] mx-auto max-w-6xl">
      <Link to={`/galleryDetails/${videoData[0]?._id}`}>
        <div className="card card-compactbg-white p-6 w-full shadow-md image-full bg-white border border-gray-300">
          <figure>
            <img
              src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
              className="rounded-lg w-full object-cover"
            />
          </figure>
          <div className="card-body">
            {/* <div className="flex items-center justify-between">
              <div className="badge badge-neutral font-semibold text-md text-white">
                LifeStyle
              </div>
              <CiHeart
                size="1.5em"
                color="white"
                className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white"
                style={{ cursor: "pointer" }}
              />
            </div> */}
            <div className="card-body items-center justify-center">
              <div className="card-body items-center justify-center">
                <FaRegPlayCircle
                  size="2.5em"
                  className="text-white hover:text-green-500"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="bg-white shadow-md p-6 border border-gray-300 ">
        <div className="p-3 border border-gray-300 ">
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4 mt-4 ">
            {imageData.slice(0, 5).map((image, index) => (
              <Link to={`/galleryDetails/${image?._id}`} key={image?._id.$oid}>
                <div className="card card-compact shadow-xl w-full  md:max-w-64 max-h-36">
                  <figure>
                    <img
                      src={image?.image}
                      alt={`Image ${index + 1}`}
                      className="rounded-xl object-contain"
                    />
                  </figure>
                </div>
              </Link>
            ))}
            {imageData?.length > 5 && (
              <Link to="/gallery/">
                <div className="card card-compact bg-base-content shadow-xl rounded-xl image-full bg-none w-full lg:max-w-64 max-h-36">
                  <figure>
                    <img
                      src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
                      className="rounded-lg w-full object-cover"
                    />
                  </figure>
                  <div className="card-body items-center justify-center">
                    <div className="avatar placeholder">
                      <div className="bg-base-content text-lg text-white  rounded-full w-12">
                        <span>+{imageData.length - 6}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md p-6 border border-gray-300 rounded-lg">
          <div className="p-3 border border-gray-300 rounded-lg">
            {topics &&
              topics.slice(0, 4).map((tp) => (
                <div className="flex justify-between items-center" key={tp._id}>
                  <div className="flex flex-row justify-start gap-2 items-center py-2">
                    <img
                      className="w-16 h-16 rounded-full shadow-lg"
                      src={tp.author.profilePic}
                      alt="Bonnie image"
                    />
                    <div>
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        Bonnie Green
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Visual Designer
                      </span>
                    </div>
                  </div>
                  <div className=" bg-green-500 py-3 text-white px-3 rounded-lg">
                    Read Now
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full flex justify-end px-6 py-2 font-bold">
            <Link to={"/community/topics"}>Read More</Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300 ">
        <div className="p-3 border border-gray-300 rounded-lg">
          <Link>
            <div className="py-2 flex flex-col overflow-auto w-full">
              {conversations.map((conversation, idx) => (
                <>
                  <div
                    className={`flex gap-2 border items-center w-full hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
                  >
                    <div className={`avatar}`}>
                      <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt={conversation.fullName} />
                      </div>
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between">
                        <div className="flex gap-1 flex-col">
                          <p className="font-bold text-gray-600">{conversation.fullName}</p>
                          <p className="font-thin text-xs text-gray-600">{conversation?.lastMessage}</p>
                        </div>
                        <div>
                          <p className="font-bold text-xs text-gray-600">{
                            conversation?.messageSendTime
                              ? new Date(conversation.messageSendTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                              : ''
                          }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
              ) : null}
            </div>
          </Link>
        </div>
        <Link to='/chatpage' className="flex justify-end py-8">
          <button className="font-bold">Go To Chat Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
