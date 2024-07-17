import React from 'react'
import { FaArrowDown, FaArrowRightArrowLeft, FaArrowUp } from 'react-icons/fa6';

const StatsTable = ({data}) => {

    
    return (
        <div className="w-full mx-auto pb-6 mt-4 lg:p-4 md:p-4 p-1 border rounded-[20px]">
          <div className="grid grid-cols-4 mb-3 lg:gap-4 md:gap-4 gap-1 lg:p-4 md:p-4 p-3 rounded-t-lg text-center">
            <div className="font-bold text-left">S/N</div>
            <div className="font-bold text-left">Topic</div>
            <div className="font-bold text-left">Reactions</div>
            <div className="font-bold text-left">Rates</div>
          </div>
          {data.map((row, index) => {
            let condition = ''

            const result = row.results
   
            if(result === 'goUp' ) {
              condition = 'text-green-400'
            }
            if(result === 'comeDown') {
             condition = 'text-red-400'
            }
            if(result === 'noChange') {
             condition = 'text-gray-600'
            }
            
           return (   <div
              key={index}
              className={`${index % 2 == 0 ? ' bg-slate-300 text-grey-300 ' : 'bg-white border'} grid grid-cols-4 text-center gap-3 bg-white p-3  border-gray-200 rounded-lg mb-2 `}
            >
              <div className="font-thin text-sm  text-left">{index + 1}</div>
              <div className="font-thin text-sm  text-left">{row.topic}</div>
              <div className="font-thin text-sm  text-left">{row.Reactions}</div>
              <div className="font-thin text-sm  flex items-center
           justify-center gap-2">
            {row.rate}
            <span className={`${condition} ml-0.5`}>
            {row.results === 'goUp' && (<FaArrowUp /> )  }
            {row.results === 'comeDown' && (<FaArrowDown /> )  }
            {row.results === 'noChange' && (<FaArrowRightArrowLeft />)}

            </span>
          </div>
            </div>
          )})}
        </div>
      );
}

export default StatsTable