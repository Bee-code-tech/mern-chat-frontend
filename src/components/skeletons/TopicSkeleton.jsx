import React from 'react'

const TopicSkeleton = () => {
  return (
    <div className="rounded-lg p-6  w-full shadow-lg ">
    <div className="flex items-center justify-between">
      <h2 className="skeleton w-[16rem] h-8"></h2>
      {/* <FaBookmark size={20} className="" /> */}
        <div className='skeleton w-8 h-10'>
          
        </div>
    </div>
    <div className="flex gap-4 my-4">
      <div className="skeleton w-12 h-12 lg:h-24 lg:w-24 md:w-24 md:h-24 rounded-full"></div>
      <div>
        <p className="skeleton w-36 h-4 mb-3">
        </p>
        <p className="skeleton w-24 h-4 mb-4"></p>
        <p className="skeleton w-20 h-4">
        </p>
      </div>
    </div>

    <p
      className="skeleton w-full h-8 lg:h-16 md:h-16"
    />
    <button
      className="mt-3 skeleton w-24 h-10"
    >
      
    </button>
  </div>
  )
}

export default TopicSkeleton