import React from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import { FaArrowLeft, FaCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const ChatList = ({ toggleSidebar }) => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    // Prevent click propagation to parent
    e.stopPropagation();
  };

  const handleback = () => {
    navigate(-1)
  }

  return (
   <div className="main">
    <div className="flex justify-between items-center mb-2 p-4">

    <Link 
      onClick={handleback}
       className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
       rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
        hover:text-white text-sm flex items-center justify-center gap-2"
     >
       <FaArrowLeft />
       Back
     </Link>
      
      <Link to='/community/connect'
       className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
       rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
        hover:text-white text-sm flex items-center justify-center gap-2"
     >
       <FaCirclePlus />
       Connect
     </Link>

     


    
    </div>

    {/* Main body  */}
    <div className="border p-2 border-green-300 rounded-[20px]">
     <div
      className="border h-auto overflow-y-auto rounded-[20px] w-full p-2 lg:p-8 md:p-8 flex flex-col"
      onClick={handleClick}
    >
      {/* <SearchInput /> */}
      <Conversations toggleSidebar={toggleSidebar} />
    </div>
   </div>
   </div>
  );
};

export default ChatList;
