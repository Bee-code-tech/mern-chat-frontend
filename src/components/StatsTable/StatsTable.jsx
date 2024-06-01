import React from 'react'

const StatsTable = ({data}) => {

    
    return (
        <div className="w-full mx-auto pb-6 mt-12 lg:p-4 md:p-4 p-1 border rounded-[20px]">
          <div className="grid grid-cols-4 mb-3 lg:gap-4 md:gap-4 gap-1 lg:p-4 md:p-4 p-3 rounded-t-lg text-center">
            <div className="font-bold text-left">S/N</div>
            <div className="font-bold text-left">Topic</div>
            <div className="font-bold text-left">Reactions</div>
            <div className="font-bold text-left">Rates</div>
          </div>
          {data.map((row, index) => (
            <div
              key={index}
              className={`${index % 2 == 0 ? 'bg-green-100' : 'bg-white border'} grid grid-cols-4 text-center gap-3 bg-white p-3  border-gray-200 rounded-lg mb-2 `}
            >
              <div className="font-thin text-sm text-gray-600 text-left">{index + 1}</div>
              <div className="font-thin text-sm text-gray-600 text-left">{row.topic}</div>
              <div className="font-thin text-sm text-gray-600 text-left">{row.reactions}</div>
              <div className="font-thin text-sm text-gray-600 text-left">{row.rate}
               <span className="text-green-600 ml-0.5">+3</span></div>
            </div>
          ))}
        </div>
      );
}

export default StatsTable