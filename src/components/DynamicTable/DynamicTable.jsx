import React from 'react';

const DynamicTable = ({ data }) => {
  return (
    <div className="container mx-auto pb-6  p-4 shadow-lg rounded-[20px]">
      <div className="grid grid-cols-4 mb-3 gap-4 p-4 rounded-t-lg text-center">
        <div className="font-bold text-left">Topic</div>
        <div className="font-bold">Contribution</div>
        <div className="font-bold">Last</div>
        <div className="font-bold">Appreciation</div>
      </div>
      {data.map((row, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 text-center gap-4 bg-white p-4 ${index < data.length - 1 ? 'border-b' : ''}`}
        >
          <div className="font-thin text-sm text-gray-600 text-left">{row.topic}</div>
          <div className="font-thin text-sm text-gray-600">{row.contribution}</div>
          <div className="font-thin text-sm text-gray-600">{row.last}</div>
          <div className="font-thin text-sm text-gray-600">{row.appreciation} <span className="text-green-600 ml-0.5">+3</span></div>
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
