import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { CiHeart } from "react-icons/ci";
import { FaRegPlayCircle } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";
import logo from "../../assets/Biopic.png";
import { GoInfo } from "react-icons/go";
import DynamicTable from "../../components/DynamicTable/DynamicTable";


const data = [
  { topic: 'React', contribution: 56, last: '20 days ago', appreciation: '🏆 (15)' },
  { topic: 'Tailwind', contribution: 34, last: '3 days ago', appreciation: '🏆 (13)' },
  { topic: 'JavaScript', contribution: 78, last: '20 days ago', appreciation: '🏆 (33)' },
  { topic: 'Node.js', contribution: 67, last: '9 days ago', appreciation: '🏆 (50)' },
];

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
      console.log(data);
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
    console.log(data);
    setTopics(data.data);
  };

  useEffect(() => {
    getTopics();
  }, []);

  // console.log(topics, 'topics from home page');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12 my-[130px] mx-auto max-w-6xl">
      
      {/* first grid item  */}
      <div>
        {/* Video  */}
        <Link to={`/galleryDetails/${videoData[0]?._id}`}>
          <div className="border border-green-300 p-2 rounded-[20px] ">
          <div className="card card-compactbg-white p-4 w-full image-full bg-white border border-gray-300">
            <figure>
              <img
                src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
                className="rounded-lg w-full object-cover"
              />
            </figure>
            <div className="card-body">
            
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
          </div>
        </Link>

        {/* Info text  */}
         <div className="w-full mt-8 flex items-center  justify-between px-6">
          <div className="flex">
          <img src={logo} alt="Logo" className="h-5" />

          </div>
          <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
         </div>
      </div>

      {/* second grid item  */}
     <div >
        <div className="p-2 border h-[330px] border-green-300 rounded-[20px]">
          <div className="bg-white h-full p-2 border rounded-[20px] border-gray-300 ">
              {/* Video list */}
                <div className="grid items-center justify-center w-full h-full grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-3 p-3  ">
                  {imageData.slice(0, 5).map((image, index) => (
                    <>
                    <Link to={`/galleryDetails/${image?._id}`} key={image?._id.$oid}>
                      <div className="card card-compact shadow-xl w-full  md:max-w-64 max-h-46">
                        <figure>
                          <img
                            src={image?.image}
                            alt={`Image ${index + 1}`}
                            className="h-full rounded-xl object-contain"
                          />
                        </figure>
                      </div>
                    </Link>
                    
                    </>
                  ))}
                  {imageData?.length > 5 && (
                    <Link to="/gallery/">
                      <div className="card card-compact bg-base-content shadow-xl rounded-xl image-full bg-none w-full lg:max-w-64 max-h-46">
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
              {/* Video list end */}
          </div>
        </div>

         {/* Info text  */}
         <div className="w-full mt-8 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
            <p className="text-xl text-gray-400 leading-3">My</p>
            <img src={logo} alt="Logo" className="h-5" />
            <p className="text-xl text-gray-400 leading-3">Pics</p>
            </div>
            <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
         </div>
     </div>

      {/* third grid item  */}
      <div>
            <div className="bg-white  p-2 border border-green-300 rounded-[20px]">
              <div className="border border-grey-300 rounded-[20px] p-4 ">
              <DynamicTable data={data} />
              </div>
            </div>
             {/* Info text  */}
         <div className="w-full mt-8 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
            <p className="text-xl text-gray-400 leading-3">My</p>
            <img src={logo} alt="Logo" className="h-5" />
            <p className="text-xl text-gray-400 leading-3">Community</p>
            </div>
            <Link to='/community/topics'>
            <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
            </Link>
         </div>
      </div>


      {/* fourth grid item  */}
     <div>
        <div className="bg-white rounded-[20px] p-2 border border-green-300 ">
            <div className="p-2 border border-gray-300 rounded-[20px]">
              <Link>
                <div className=" flex flex-col overflow-auto w-full">
                  {conversations.slice(0,4).reverse().map((conversation, idx) => (
                    <>
                      <div key={idx}
                        className={`flex gap-2 mb-2 ${idx < conversations.length - 1 ? 'border-b' : ''} items-center w-full hover:bg-green-50 duration-150 transition-all ease-in rounded-[20px] p-2 py-3 cursor-pointer`}
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
                              <span className="bg-green-400 mt-3 text-white h-3 w-3 rounded-full p-3 flex items-center justify-center text-sm ">
                                8
                              </span>
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
        </div>

         {/* Info text  */}
         <div className="w-full mt-8 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
            <p className="text-xl text-gray-400 leading-3">My</p>
            <img src={logo} alt="Logo" className="h-5" />
            <p className="text-xl text-gray-400 leading-3">Chats</p>
            </div>
            <Link to='/chatpage'>
            <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
            </Link>
         </div>
        
     </div>


    </div>
  );
};

export default Home;
