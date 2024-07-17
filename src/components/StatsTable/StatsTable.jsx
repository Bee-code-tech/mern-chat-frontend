import React from 'react'
import { FaArrowDown, FaArrowRightArrowLeft, FaArrowUp } from 'react-icons/fa6';

const StatsTable = ({data}) => {

    
    return (
        <div className="w-full mx-auto pb-6 mt-4 lg:p-4 md:p-4 p-1 border rounded-[20px]">
          
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
              className={`${ 'bg-white border'} grid grid-cols-4 text-left gap-3 bg-white p-3  border-gray-200 rounded-lg mb-2 `}
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