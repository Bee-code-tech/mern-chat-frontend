import React, { useState } from 'react';
import StatsTable from '../../components/StatsTable/StatsTable';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'All Time'];
  const data = [
    { topic: 'React', reactions: 56, rate: '🏆 (15)' },
    { topic: 'Tailwind', reactions: 34, rate: '🏆 (13)' },
    { topic: 'JavaScript', reactions: 78, rate: '🏆 (33)' },
    { topic: 'Node.js', reactions: 67, rate: '🏆 (50)' },
    { topic: 'Node.js', reactions: 67, rate: '🏆 (50)' },
    { topic: 'Node.js', reactions: 67, rate: '🏆 (50)' },
  ];
  const contents = {
    'Daily': <StatsTable data={data} />,
    'Weekly': <StatsTable data={data} />,
    'Monthly': <StatsTable data={data} />,
    'Yearly': <StatsTable data={data} />,
    'All Time': <StatsTable data={data} />,
  };

  return (
    <div className="max-full mx-auto">
      <div className="justify-between flex w-full border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`inline-block w-full py-2 px-4 text-gray-600 focus:outline-none transition duration-500 ${
              activeTab === tab ? 'border-b-2 border-green-500 text-green-500' : ''
            } ${index === 4 ? 'hidden sm:inline-block' : ''}`}  // Hides the fifth item on small screens
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex item-center mx-auto justify-between mt-8 md:lg-16 lg:mt-16 flex-col lg:flex-row md:flex-row">
      <h2 className="text-2xl w-full mb-6 lg:mb-0 md:mb-0 font-bold">
        Search Topics
      </h2>
        <label className="input input-bordered rounded-lg md:w-1/2 w-full lg:w-1/2  flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search for topics" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>

      <div className="mt-8">
        <h1 className='font-bold text-3xl'>Christiano Ronaldo</h1>
        <p className='font-thin leading-7 mt-2'>Search result (300+ outcomes)</p>
      </div>

      
      <div className="mt-4">
        {contents[activeTab]}
      </div>
    </div>
  );
}

export default Statistics;
