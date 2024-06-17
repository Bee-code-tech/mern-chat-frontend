import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

const DynamicTable = ({ data }) => {

  
  return (
    <div className="container mx-auto pb-6  lg:p-6 md:p-4 p-1 shadow-lg rounded-[20px]">
      <div className="grid grid-cols-3 mb-3 lg:gap-4 md:gap-4 gap-1 lg:p-4 md:p-4 p-1 rounded-t-lg text-center">
        <div className="font-bold text-left">Topic</div>
        <div className="font-bold  -ml-8">Reactions</div>
        <div className="font-bold">Rate</div>
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
        
        return ( <div
          key={index}
          className={`grid grid-cols-3 text-center gap-4 bg-white p-4 ${index < data.length - 1 ? 'border-b' : ''}`}
        >
          <div className="font-thin text-sm text-gray-600 text-left">{row.topic}</div>
          <div className="font-thin text-sm text-gray-600">{row.Reactions}</div>
          <div className="font-thin text-sm text-gray-600 flex items-center
           justify-center gap-2">
            {row.rate}
            <span className={`${condition} ml-0.5`}>
            {row.results === 'goUp' && (<FaArrowUp /> )  }
            {row.results === 'comeDown' && (<FaArrowDown /> )  }
            {row.results === 'noChange' && (<FaArrowRightArrowLeft />)}

            </span>
          </div>
        </div>
        )
      }

     
      )}
    </div>
  );
};

export default DynamicTable;
