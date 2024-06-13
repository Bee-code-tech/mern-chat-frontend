import React from 'react'
import { CiGlobe } from 'react-icons/ci';
import { GoInfo } from 'react-icons/go';
import { Link } from 'react-router-dom';
import RequestList from '../../components/RequestList/RequestList';
import ConversationSkeleton from '../../components/skeletons/ConversationSkeleton';
import { useState } from 'react';

const Request = () => {

    const [list, setList] = useState([...Array(6)])
    const [loading, setLoading] = useState(false)

    return (
        <div className="main">
         <div className="flex justify-between items-center mb-2 p-4">
           
           <Link to='/community/topics'
            className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
            rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
             hover:text-white text-sm flex items-center justify-center gap-2"
          >
            <CiGlobe />
            Community
          </Link>
     
     
          <Link to='/chatpage'>
                 <GoInfo className="text-xl cursor-pointer hover:text-2xl hover:text-green-300 transition-all ease-in" />
           </Link>
         </div>
     
         {/* Main body  */}
         <div className="border p-2 border-green-300 rounded-[20px]">
          <div
           className="border h-auto overflow-y-auto rounded-[20px] w-full p-2 lg:p-8 md:p-8 flex flex-col"
         >
     
     <div className="flex flex-col overflow-auto">
           <div className="py-2 flex flex-col overflow-auto gap-4">
             {list.length === 0 ? (null) : ( 
                 list.map((_, idx) => (
                 <div key={idx}>
                   <RequestList />
                 </div> )
             ))}
     
             {loading ? (
               <span className="">
                 {
                   [...Array(7)].map((_, idx) => <ConversationSkeleton key={idx }/> )
                 }
               </span>
             ) : null}
           </div>
         </div>
     
           
         </div>
        </div>
        </div>
       );
}

export default Request