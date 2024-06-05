
import moment from "moment";
import { timeAgo } from "../../utils/timeDifference";
import {useState} from 'react'

const NotificationCard = ({data}) => {
  
    const [loading, setLoading] = useState()


  return (
    <div className="rounded-lg p-6 border ">
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
          
          <p className="text-[#666666] font-medium"> <span className="font-bold">Comment:</span> {data.comment}</p>
          <p className="text-[#999999] font-medium mt-4 text-sm">
            {moment(data.createdAt).calendar()}
          </p>
        </div>
      </div>

      
      
    </div>
  );
};

export default NotificationCard


