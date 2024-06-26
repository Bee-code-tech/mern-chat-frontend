import React, { useState, useEffect } from 'react';
import StatsTable from '../../components/StatsTable/StatsTable';
import { FaSearch } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const [dailyData, setDailyData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [yearlyData, setYearlyData] = useState([])
  const [input, setInput] = useState('')
  const [occurrences, setOccurrences] = useState(0)
  const {authUser} = useAuthContext()

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
 
  const contents = {
    'Daily': <StatsTable data={dailyData} />,
    'Weekly': <StatsTable data={weeklyData} />,
    'Monthly': <StatsTable data={monthlyData} />,
    'Yearly': <StatsTable data={yearlyData} />,
    'All Time': <StatsTable data={dailyData} />,
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/search?query=${input}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
       const result = await res.json()

       setOccurrences(result.occurrences)
      
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };
    fetchSearch()
  }

  useEffect(() => {
    const fetchDailyStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/daily`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
  
        const topics = await res.json();
       
  
        
        
  
      setDailyData(topics.topics)
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    const fetchWeeklyStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/weekly`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
  
        const topics = await res.json();
       
  
        
        
  
      setWeeklyData(topics.topics)
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    const fetchMonthlyStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/monthly`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            }
          }
        );
  
        const topics = await res.json();
       
  
        
        
  
      setMonthlyData(topics.topics)
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    const fetchYearlyStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/yearly`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            }
          }
        );
  
        const topics = await res.json();
       
  
        
        
  
      setYearlyData(topics.topics)
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchYearlyStats()
    fetchMonthlyStats()
    fetchDailyStats();
    fetchWeeklyStats();
  }, [])

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
        <form onSubmit={handleSubmit} className='md:w-[60rem] w-full lg:w-[60rem] relative flex items-center justify-center gap-2'>
          <input
           type="text" placeholder='Search for topics'
          className='w-full p-4 rounded-lg border
           border-slate-300 bg-transparent focus:outline-green-300 h-12'
           onChange={(e) => setInput(e.target.value)}
           />
          
          <button type='submit'  className='absolute right-5 cursor-pointer ease-in-out hover:scale-110 duration-300 transition'>
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h1 className='font-bold text-3xl capitalize'>{input}</h1>
        <p className='font-thin leading-7 mt-2'>{
          input && (` 
            Search result (${occurrences} ${occurrences <= 1 ? 'outcome' : 'outcomes'})`
          )
        }</p>
      </div>

      
      <div className="mt-4">
        {contents[activeTab]}
      </div>
    </div>
  );
}

export default Statistics;
