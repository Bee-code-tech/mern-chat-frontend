import React from 'react'

const ConversationSkeleton = () => {
  return (
    <div
    className={`flex gap-2 mb-2  border-b items-center w-full  rounded-[20px] p-2 py-3 `}
  >
    <div >
      <div className="w-12 h-12 rounded-full skeleton">
      </div>
    </div>

    <div className="flex flex-col flex-1">
      <div className="flex justify-between">
        <div className="flex gap-1 flex-col">
          <p className=" skeleton w-12 h-4"></p>
          <p className="skeleton w-32 h-4 "></p>
        </div>
        <div className='flex items-end flex-col gap-3 '>
          <p className="skeleton w-20 h-4 "></p>
          <p className="skeleton w-4 h-4 rounded-full "></p>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default ConversationSkeleton