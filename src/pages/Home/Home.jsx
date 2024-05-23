import React, { useEffect, useState } from "react";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import image5 from "../../assets/5.png";
import image6 from "../../assets/6.png";
import mainImage from "../../assets/Main.png";

import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "../../components/sidebar/Conversation";

const Home = () => {

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
  }, [])

  console.log(topics, 'topics from home page');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 my-[100px] mx-auto max-w-6xl">
      <div className="bg-white shadow-md p-6 border border-gray-300 rounded-lg">
        <img src={mainImage} alt="imageImage" />
      </div>

      <div className="bg-white shadow-md p-6 border border-gray-300 rounded-lg">
        <div className="p-3 border border-gray-300 rounded-lg">
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src={image1} alt="Image 1" className="rounded-lg" />
            <img src={image2} alt="Image 2" className="rounded-lg" />
            <img src={image3} alt="Image 3" className="rounded-lg" />
            <img src={image4} alt="Image 4" className="rounded-lg" />
            <img src={image5} alt="Image 5" className="rounded-lg" />
            <img src={image6} alt="Image 6" className="rounded-lg" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white shadow-md p-6 border border-gray-300 rounded-lg">
          <div className="p-3 border border-gray-300 rounded-lg">
            {topics && topics.slice(0, 4).map(tp =>
              <div class="flex justify-between items-center">
                <div className="flex flex-row justify-start gap-2 items-center py-2">
                  <img class="w-16 h-16 rounded-full shadow-lg" src={tp.author.profilePic} alt="Bonnie image" />
                  <div>
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                  </div>
                </div>
                <div className=" bg-green-500 py-3 text-white px-3 rounded-lg">Read Now</div>
              </div>
            )}
          </div>
          <div className="w-full flex justify-end px-6 py-2 font-bold">
            <Link to={"/community/topics"}>
              Read More
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-300">
        <div className="p-3 border border-gray-300 bg-green-500 rounded-lg flex justify-center">
          <Link to="/chatPage">
            <div className="py-2 flex flex-col overflow-auto w-full">
              {conversations.map((conversation, idx) => (
                <div
                  className={`flex gap-2 border items-center w-full hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
                >
                  <div className={`avatar}`}>
                    <div className="w-12 rounded-full">
                      <img src={conversation.profilePic} alt={conversation.fullName} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                      <p className="font-bold text-gray-600">{conversation.fullName}</p>
                    </div>
                  </div>
                </div>
              ))}

              {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
