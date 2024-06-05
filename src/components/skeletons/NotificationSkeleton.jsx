import React from 'react'

const NotificationSkeleton = () => {
  return (
    <div className="rounded-lg skeleton p-6 shadow-md bg-white w-full">
        <div className="flex items-center justify-between">
        <div className="skeleton w-36 h-8 rounded-lg"></div>
        </div>
        <div className="flex gap-4 my-4">
        <div className="skeleton w-16 h-16 rounded-full"></div>

        <div>
            
           <div className="w-36  rounded-lg flex flex-col items-center gap-3 ">
              <div className='skeleton w-full h-6'></div>
              <div className='skeleton w-full h-6'></div>
           </div>
        </div>
        </div>   
    
    </div>
  )
}

export default NotificationSkeleton