// src/components/LoadingSkeleton/LoadingSkeleton.js

import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full mx-auto pb-6 mt-4 lg:p-4 md:p-4 p-1 border rounded-[20px]">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse border hover:scale-95 cursor-pointer duration-300 ease-in-out grid grid-cols-4 text-left gap-3 p-3 border-gray-200 rounded-lg mb-2"
        >
          <div className="font-thin text-sm text-left bg-gray-300 h-6 w-6 rounded"></div>
          <div className="font-thin text-sm text-left bg-gray-300 h-6 w-3/4 rounded"></div>
          <div className="font-thin text-sm text-left bg-gray-300 h-6 w-20 rounded"></div>
          <div className="font-thin text-sm flex items-center justify-center gap-2">
            <div className="bg-gray-300 h-6 w-10 rounded"></div>
            <div className="bg-gray-300 h-6 w-6 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
