


import { FaRegTrashAlt } from "react-icons/fa";
import { isBookmarked } from "../../utils/isBookmarked";
import { timeAgo } from "../../utils/timeDifference";
import demo from "../../assets/hu2.png"
import {useState} from 'react'

const NotificationCard = () => {
  
    const [loading, setLoading] = useState()


  return (
    <div className="rounded-lg p-6 border ">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Test 2 Posted A Comment</h2>

       
       
      </div>
      <div className="flex gap-4 my-4">
        <img
          className="rounded-full size-16"
          src='https://avatar.iran.liara.run/public/boy?username=oppkskd'
          alt="profileAvatar"
        />
        <div>
          
          <p className="text-[#666666] font-medium"> <span className="font-bold">Comment:</span> "Nice Write up"</p>
          <p className="text-[#999999] font-medium mt-4 text-sm">
            4 mins ago
          </p>
        </div>
      </div>

      
      
    </div>
  );
};

export default NotificationCard


