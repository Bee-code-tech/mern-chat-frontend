import React, {useState} from 'react'
import StatsTable from '../../components/StatsTable/StatsTable';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'All Time'];
  const data = [
    { topic: 'React', reactions: 56,  rate: '🏆 (15)' },
    { topic: 'Tailwind', reactions: 34,  rate: '🏆 (13)' },
    { topic: 'JavaScript', reactions: 78,  rate: '🏆 (33)' },
    { topic: 'Node.js', reactions: 67,  rate: '🏆 (50)' },
    { topic: 'Node.js', reactions: 67,  rate: '🏆 (50)' },
    { topic: 'Node.js', reactions: 67,  rate: '🏆 (50)' },
  ];
  const contents = {
    'Daily': <StatsTable data={data}/>,
    'Weekly': <div>Weekly Content</div>,
    'Monthly': <div>Monthly Content</div>,
    'Yearly': <div>Yearly Content</div>,
    'All Time': <div>All Time Content</div>,
  };

  return (
    <div className="max-full mx-auto">
      <div className=" justify-between  flex w-full  border-gray-200">
        {tabs.map((tab, index) => (
           <button
           key={tab}
           className={`inline-block py-2 px-4 text-gray-600 focus:outline-none ${
             activeTab === tab ? 'border-b border-green-500 text-green-500' : ''
           } ${index === 4 ? 'hidden sm:inline-block' : ''}`}  // Hides the fifth item on small screens
           onClick={() => setActiveTab(tab)}
         >
            {`${tab} (+4)`}
          </button>
        ))}
      </div>
      <div className="">
        {contents[activeTab]}
      </div>
    </div>
  );
}

export default Statistics