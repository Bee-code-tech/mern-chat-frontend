import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/ChatList";
import { FaRegPlayCircle } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";
import logo from "../../assets/Biopic.png";
import fallback from "../../assets/upload.png"
import fallbackForum from "../../assets/forum.png"
import fallbackComm from "../../assets/community.png"
import { GoInfo } from "react-icons/go";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import GallerySkeleton from "../../components/skeletons/GallerySkeleton";
import ConversationSkeleton from "../../components/skeletons/ConversationSkeleton";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import MessageContainer from "../../components/messages/MessageContainer";
import vidFallback from '../../assets/vid.png'
import StatsSkeleton from "../../components/skeletons/StatsSkeleton";
import { useAuthContext } from "../../context/AuthContext";
import { timeAgo } from "../../utils/timeDifference";
import ThankYou from "../../components/Modal/ThankYou";


const Home = () => {
  const [galleryData, setGalleryData] = useState([]);
  const { authUser } = useAuthContext()
  const [videoData, setVideoData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loadingImageData, setLoadingImageData] = useState(false);
  const [dailyData, setDailyData] = useState([]);
  const [loadingDailyData, setLoadingDailyData] = useState(false);
  const [isDailyEmpty, setIsDailyEmpty] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isThanksOpen, setIsThanksOpen] = useState(false)
  const {onlineUsers} = useSocketContext
  const {selectedConversation, setSelectedConversation} = useConversation()
  const [modalUserName, setModalUserName] = useState(null)
  const [modalId, setModalId] = useState(null)
  const [modalProfilePicture, setModalProfilePicture] = useState(null)


  useEffect(() => {
    fetchGalleryData();
    fetchDailyStats()
  }, []);

  useEffect(() => {
    
    if (isModalOpen && !isThanksOpen) {
      setIsThanksOpen(false)
      setIsModalOpen(true) 
      console.log(isThanksOpen , isModalOpen);
    }

  }, [isModalOpen])

  const fetchGalleryData = async () => {
    try {
      setLoadingImageData(true);
     
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/gallery/data`,
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
      setLoadingImageData(false);
      const data = await res.json();
      const videos = data.filter((item) => item.video);
      const images = data.filter((item) => item.image);
      setVideoData(videos);
      setImageData(images);
      setGalleryData(data);

      
      if (imageData.length === 0 || videoData.length === 0) {
        setIsEmpty(true);
      }
      console.log(' fetcht data', data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  const fetchDailyStats = async () => {
    try {
      setLoadingDailyData(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/weekly`,
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

      const topics = await res.json();

      if (topics.topics.length === 0) {
        setIsDailyEmpty(true);
      }

      setDailyData(topics.topics.slice(0, 4));
      setLoadingDailyData(false);

      console.log('daily Data:', dailyData);
    } catch (error) {
      console.error("Error fetching daily stats:", error);
    }
  };

  const getTopics = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setTopics(data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleModalClose = () => {
    setIsThanksOpen(false)
  } 

  const handleModalOpen = ( username, id, profilePic ) => {
    setModalUserName(username)
    setModalId(id)
    setModalProfilePicture(profilePic)
    setIsThanksOpen(true)
  }

 






  const [topics, setTopics] = useState([]);
  const { isConvEmpty, loading, conversations } = useGetConversations();

 

  useEffect(() => {
    getTopics();
  }, []);

  const toggleModal = () => {
   setIsModalOpen(!isModalOpen);
   
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12 lg:gap-8 md:gap-8 my-[20px] mx-auto max-w-6xl">
      
      {/* first grid item  */}
     {
      videoData.length > 0 ? (
        <div className="mb-6"> 
        {/* Video  */}
        <Link to={`/gallery/vids`}>
          <div className="border border-green-300 p-2 rounded-[20px] ">
          <div className="card hover:card-compactbg-white  p-4 w-full h-[340px]
          image-full bg-white border border-gray-300">
            <figure className="bg-transparent">
            <video
              src={videoData.reverse()[0].video}
              className="rounded-lg w-full h-full object-cover"
              autoPlay
              muted
              loop
                  >
                Your browser does not support the video tag.
              </video>
            </figure>
            <div className="card-body">
            
              <div className="card-body items-center justify-center">
                <div className="card-body items-center justify-center">
                  <FaRegPlayCircle
                    size="2.5em"
                    className="text-white  hover:scale-120  hover:text-green-500"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>  
          </div>
        </Link>

        {/* Info text  */}
         <div className="w-full mt-4 flex items-center  justify-between px-6">
          <div className="flex">
          <img src={logo} alt="Logo" className="h-5" />

          </div>
          <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
         </div>
      </div>
      ) : (
        <div className="mb-6"> 
        {/* Video  */}
        <Link to={`/gallery/`}>
          <div className="border border-green-300 p-2 rounded-[20px] ">
          <div className="card hover:card-compactbg-white  p-4 w-full h-[340px]
          image-full bg-white border border-gray-300">
            <figure className="bg-transparent">
              <img
                src={vidFallback}
                className="rounded-lg w-[250px]  object-cover"
              />
            </figure>
            <div className="card-body">
            
              <div className="card-body items-center justify-center">
                <div className="card-body items-center justify-center">
                  <FaRegPlayCircle
                    size="2.5em"
                    className="text-white  hover:scale-120  hover:text-green-500"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>  
          </div>
        </Link>

        {/* Info text  */}
         <div className="w-full mt-4 flex items-center  justify-between px-6">
          <div className="flex">
          <img src={logo} alt="Logo" className="h-5" />

          </div>
          <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
         </div>
      </div>
      )
     }

      {/* second grid item */}
<div className="mb-6">
  <div className="p-2 border lg:h-[357px] md:h-[357px] h-auto border-green-300 rounded-[20px]">
    <div className="bg-white h-full p-2 border rounded-[20px] border-gray-300">
      <Link to="/gallery/">
        {imageData.length === 0 && !loadingDailyData && (
          <div className="w-full h-full rounded-xl flex flex-col items-center justify-center -mb-4">
            <div className="h-auto overflow-hidden p-4 flex items-center my-3 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-300 transition">
              <img src={fallback} alt="" className="block w-full h-[222px] object-cover" />
            </div>
            <h1 className="text-center text-xl font-bold">Click to Upload</h1>
          </div>
        )}
      </Link>
      {/* Pic list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {loadingImageData && [...Array(9)].map((_, idx) => <GallerySkeleton key={idx} />)}
        {imageData.slice(0, 8).map((item, index) => (
          <Link to={`/gallery/`} key={index}>
            <div className="flex items-center flex-shrink-0 shadow-xl w-full md:h-[70px] h-auto lg:h-[70px] overflow-hidden rounded-md">
              <figure className="w-full h-full">
                {item?.image ? (
                  <img
                    src={item?.image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                 null
                )}
              </figure>
            </div>
          </Link>
         ))}

        {imageData?.length > 8 && (
          <Link to="/gallery/">
            <div className="card card-compact bg-base-content shadow-xl rounded-xl image-full bg-none w-full h-[70px]">
              <figure className="w-full h-full">
                <img
                  src="https://i.ibb.co/CMLfZkc/pexels-inspiredimages-157543.jpg"
                  className="rounded-lg w-full h-full object-cover"
                />
              </figure>
              <div className="card-body items-center justify-center">
                <div className="avatar placeholder">
                  <div className="bg-base-content text-lg text-white rounded-full w-12">
                    <span>+{imageData.length - 8}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  </div>

  
         {/* Info text  */}
         <div className="w-full mt-4 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
          
            <img src={logo} alt="Logo" className="h-5 mt-[4px]" />
            <p className="text-xl text-gray-400 leading-3">Pics</p>
            </div>
            <Link to='/chatpage'>
            <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
            </Link>
         </div>
</div>


      {/* third grid item  */}
      <div >
            <div className="bg-white  p-2 border border-green-300 rounded-[20px]">
              <div className="border border-grey-300 rounded-[20px] p-6 ">
              {loadingImageData && !isDailyEmpty && [...Array(4)].map((_, idx) =>  <StatsSkeleton key={idx}/> ) }
                
                { isDailyEmpty && (
                  <div className="w-full h-[300px] rounded-xl flex flex-col items-center justify-center -mb-4">
                  <div className="h-auto overflow-hidden flex items-center my-3 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-300 transition ">
                   <img src={fallbackComm} alt="" className="block h-[214px] object-cover" />
                  </div>
                    <h1 className="text-center text-xl font-bold">No Posts Yet</h1>
                  </div>
                )}
              
              {
               !loadingDailyData && !isDailyEmpty && dailyData.length > 0 && (
                  
                  <DynamicTable data={dailyData} />
               )
              }
  
              </div>
            </div>
             {/* Info text  */}
         <div className="w-full mt-4 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
           
            <img src={logo} alt="Logo" className="h-5 mt-[4px]" />
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

          <Link to='/community/connect' >
            {!loading && isConvEmpty && (
              <div className="w-full h-[375px] rounded-xl flex flex-col items-center justify-center -mb-4">
                <div className="h-auto overflow-hidden flex items-center my-3 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-300 transition ">
                 <img src={fallbackForum} alt="" className="block h-[300px] object-cover" />
                </div>
                  <h1 className="text-center text-xl font-bold">Connect with others</h1>
              </div>
            )}
          </Link>
           

           {
            conversations.length > 0 && (
              <div>
                <div className=" flex flex-col md:h-[357px] h-auto lg:h-[357px] overflow-auto w-full">
                  {conversations.slice(0,4).reverse().map((conversation, idx) => {
                    const isOnline = onlineUsers?.includes(conversation._id)
                    // setSelectedConversation(conversation)
                   return  ( <div key={idx}>
                      <div 
                        className={`flex gap-2 mb-2 ${idx < conversations.length - 1 ? 'border-b' : ''} items-center w-full hover:bg-green-50 duration-150 transition-all ease-in rounded-[20px] p-2 py-3 cursor-pointer`}
                        onClick={() => {
                          setSelectedConversation(conversation);
                          toggleModal();
                        }}
                        
                      >
                        <div className={`avatar ${isOnline ? "online" : ""}`}>
                          <div className="w-14 rounded-full">
                            <img src={conversation.profilePic} alt={conversation.username} />
                          </div>
                        </div>

                        <div 
                        onMouseEnter={ () => handleModalOpen(conversation.username, conversation._id, conversation.profilePic)}
                        className="flex flex-col flex-1">
                          <div className="flex justify-between">
                            <div className="flex gap-1 flex-col">
                              <p className="font-bold text-gray-600">{conversation.username}</p>
                              <p className="font-thin text-xs capitalize text-gray-600">
                                {conversation?.lastMessage ? ` ${conversation?.lastMessage}` : `Start Chatting  "${conversation?.username}"`}
                                </p>
                            </div>
                            <div>
                              <p className="font-bold text-xs text-gray-600">{
                                conversation?.messageSendTime
                                   ? timeAgo(conversation?.messageSendTime) 
                                  : ''
                              }</p>
                              {/* <span className="bg-green-400 mt-3 text-white h-3 w-3 rounded-full p-3 flex items-center justify-center text-sm ">
                                8
                              </span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}

                  {loading ? (
                    <span>
                      { [...Array(4)].map((arr, idx) => <ConversationSkeleton key={idx} /> )}
                    </span>
                  ) : null}
                </div>
              </div>
            )
           }
              
            </div>
        </div>

         {/* Info text  */}
         <div className="w-full mt-4 flex items-center justify-between px-6">
            <div className="flex gap-2 items-center justify-center">
          
            <img src={logo} alt="Logo" className="h-5 mt-[4px]" />
            <p className="text-xl text-gray-400 leading-3">Chats</p>
            </div>
            <Link to='/chatpage'>
            <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
            </Link>
         </div>
        
     </div>


    {/* chat modal  */}
   <div className="container mx-auto max-w-5xl">
   <div className="mx-auto w-fit p-1">
        <div
          onClick={() => setIsModalOpen(false)}
          className={`fixed z-[100] p-1 flex items-center justify-center ${isModalOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div onClick={(e_) => e_.stopPropagation()} 
          className={` absolute  h-[70vh] border overflow-hidden border-green-500 rounded-xl bg-white 
          drop-shadow-lg shadow-xl dark:text-white ${isModalOpen ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
            <MessageContainer />
          </div>
        </div>
      </div>
   </div>

   {/* Thank you modal  */}
   <ThankYou 
   isOpen={isThanksOpen} 
   onClose={handleModalClose} 
   img={modalProfilePicture} 
   id={modalId} 
   name={modalUserName} />
    </div>
  );
};

export default Home;
