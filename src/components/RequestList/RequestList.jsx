import React from 'react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import { Link } from 'react-router-dom'

const RequestList = () => {
  return (
    <div className='w-full flex items-center border-b justify-between  h-auto lg:p-3 md:p-3  rounded-lg'>
        <div className=" h-full flex items-center py-3 gap-4">
          <div className="w-14 rounded-full">
            <img src='https://avatar.iran.liara.run/public/boy?username=risdim101@gmail.com'  />
          </div>

          <div className=" flex flex-col items-start justify-start h-full ">

         <p className='text-lg font-bold'>Test 1</p>
         <p className='font-thin text-[12px] lg:text-[14px] md:text-[14px] leading-6 '>Connect with Test 1 now to get started</p>
        </div>
        </div>
        
        

        <div className="flex gap-3 items-center  h-full ">
            <Link to='/community/topics'
             className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
             rounded-lg border-[#18BB0C] px-1 lg:px-3 md:px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
            hover:text-white text-sm flex items-center justify-center gap-2"
             >
              <FaCirclePlus />
                 <span className="hidden lg:block md:block">Accept</span>
            </Link>
            <Link to='/community/topics'
             className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
             rounded-lg border-red-500 px-1 lg:px-3 md:px-3 py-2 text-red-500 hover:bg-red-500
            hover:text-white text-sm flex items-center justify-center gap-2"
             >
              <MdCancel />
                 <span className="hidden lg:block md:block">Reject</span>
            </Link>
        </div>

    </div>
  )
}

export default RequestList