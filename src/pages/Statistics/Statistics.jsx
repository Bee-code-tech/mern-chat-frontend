import React, { useState, useEffect } from 'react';
import StatsTable from '../../components/StatsTable/StatsTable';
import { FaSearch } from 'react-icons/fa';
import { useAuthContext } from '../../context/AuthContext';
import CommunityTopic from '../../components/CommunityTopic/CommunityTopic';
import { CiFilter } from 'react-icons/ci';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import LoadingSkeleton from '../../components/skeletons/LoadingSkeleton';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [input, setInput] = useState('');
  const [occurrences, setOccurrences] = useState(0);
  const { authUser } = useAuthContext();
  const [showFilter, setShowFilter] = useState(false);
  const [searchedTopics, setSearchedTopics] = useState([]);
  const [loading, setLoading] = useState({
    daily: false,
    weekly: false,
    monthly: false,
    yearly: false,
    search: false,
  });
  const [dropdownData, setDropdownData] = useState({
    days: [],
    weeks: [],
    months: [],
    years: []
  });
  const [selectedFilters, setSelectedFilters] = useState({
    days: 'Days',
    weeks: 'Weeks',
    months: 'Months',
    years: 'Years'
  });
  const [showDropdown, setShowDropdown] = useState({
    days: false,
    weeks: false,
    months: false,
    years: false
  });

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'All Time'];

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const daysResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/community/topics/days`);
        const daysData = await daysResponse.json();
        const weeksResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/community/topics/weeks`);
        const weeksData = await weeksResponse.json();
        const monthsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/community/topics/months`);
        const monthsData = await monthsResponse.json();
        const yearsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/community/topics/years`);
        const yearsData = await yearsResponse.json();
        setDropdownData({
          days: daysData.days,
          weeks: weeksData.weeks,
          months: monthsData.months,
          years: yearsData.years
        });
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const fetchStats = async (tab) => {
    setLoading((prev) => ({ ...prev, [tab.toLowerCase()]: true }));
    let url = `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/${tab.toLowerCase()}`;
    if (tab === 'All Time') {
      url = `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/daily`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      const topics = await res.json();
      if (tab === 'Daily' || tab === 'All Time') setDailyData(topics.topics);
      if (tab === 'Weekly') setWeeklyData(topics.topics);
      if (tab === 'Monthly') setMonthlyData(topics.topics);
      if (tab === 'Yearly') setYearlyData(topics.topics);
    } catch (error) {
      console.error(`Error fetching ${tab.toLowerCase()} data:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [tab.toLowerCase()]: false }));
    }
  };

  const search = async (query) => {
    setLoading((prev) => ({ ...prev, search: true }));
    const { days, weeks, months, years } = selectedFilters;
    const filters = {
      day: days === 'Days' ? '' : dropdownData.days.indexOf(days),
      week: weeks === 'Weeks' ? '' : weeks.split(' ')[1],
      month: months === 'Months' ? '' : months,
      year: years === 'Years' ? '' : years,
    };
    const queryString = new URLSearchParams({ query, ...filters }).toString();
  
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/search?${queryString}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      const result = await res.json();
      setOccurrences(result.occurrences);
      setSearchedTopics(result.topics);
  
      // Clear filters after successful request
      setSelectedFilters({
        days: 'Days',
        weeks: 'Weeks',
        months: 'Months',
        years: 'Years'
      });
      setShowFilter(false)
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };
  

  const contents = {
    'Daily': loading.daily ? <LoadingSkeleton /> : <StatsTable data={dailyData} handleSearch={search} />,
    'Weekly': loading.weekly ? <LoadingSkeleton /> : <StatsTable data={weeklyData} handleSearch={search} />,
    'Monthly': loading.monthly ? <LoadingSkeleton /> : <StatsTable data={monthlyData} handleSearch={search} />,
    'Yearly': loading.yearly ? <LoadingSkeleton /> : <StatsTable data={yearlyData} handleSearch={search} />,
    'All Time': loading.daily ? <LoadingSkeleton /> : <StatsTable data={dailyData} handleSearch={search} />,
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    fetchStats(tab);
    setSearchedTopics([]);  // Clear search results when tab is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    search(input);
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
    setShowDropdown((prev) => ({ ...prev, [type]: false }));
  };

  const toggleDropdown = (type) => {
    setShowDropdown((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    fetchStats('Daily');
    fetchStats('Weekly');
    fetchStats('Monthly');
    fetchStats('Yearly');
  }, [authUser.token]);

  return (
    <div className="max-w-full mx-auto">
      {showFilter && (
        <div className="justify-evenly  py-3 flex w-full mb-8 shadow-md border-gray-200">
          {Object.keys(dropdownData).map((filterType) => (
            <div className="relative" key={filterType}>
              <button
                className="flex gap-2 hover:bg-green-500 hover:text-white items-center justify-center py-2 px-4 text-gray-600 focus:outline-none transition duration-500 rounded-full bg-white border"
                onClick={() => toggleDropdown(filterType)}
              >
                {selectedFilters[filterType]} {showDropdown[filterType] ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {showDropdown[filterType] && (
                <div className="absolute w-auto bg-white px-3 py-4 shadow-lg rounded-lg mt-2 z-10">
                  {dropdownData[filterType].map((item, index) => (
                    <div
                      key={index}
                      className="px-1 py-2 hover:text-green-500 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleFilterChange(filterType, item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {!showFilter && (
        <div className="justify-between flex w-full mb-8 shadow-md border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`inline-block w-full py-2 px-4 text-gray-600 focus:outline-none transition duration-500 ${
                activeTab === tab ? 'border-b-2 border-green-500 text-green-500' : ''
              } ${index === 4 ? 'hidden sm:inline-block' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab} {tab !== 'All Time' && `(${[dailyData, weeklyData, monthlyData, yearlyData][index].length}+)`}
            </button>
          ))}
        </div>
      )}

      <div className="flex item-center mx-auto justify-between mt-2 md:lg-16 lg:mt-4 flex-col lg:flex-row md:flex-row">
        <form onSubmit={handleSubmit} className='md:w-[500px] lg:absolute mt-4 lg:mt-0 top-4 lg:w-[600px] lg:z-[99999] flex items-center justify-center gap-2'>
          <input
            type="text"
            placeholder='Search for topics'
            className='w-full p-4 rounded-lg border border-slate-300 bg-transparent focus:outline-green-500 h-12'
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit' className='absolute right-5 cursor-pointer ease-in-out hover:scale-110 duration-300 transition'>
            <FaSearch />
          </button>
          <button type="button" className='absolute right-11 cursor-pointer ease-in-out hover:scale-110 duration-300 transition' onClick={toggleShowFilter}>
            <CiFilter className='text-2xl' />
          </button>
        </form>
      </div>

      {input && (
        <div className="mt-2">
          <h1 className='font-bold text-3xl capitalize'>{input}</h1>
          <div className="flex gap-1 items-start justify-start">
            <p className='font-thin leading-7 mt-2'>{`Search result`}</p>
            <span className='font-thin leading-7 mt-2'>{`(${occurrences} ${occurrences <= 1 ? 'outcome' : 'outcomes'})`}</span>
          </div>
        </div>
      )}

      {loading.search ? (
        <LoadingSkeleton />
      ) : (
        searchedTopics.length > 0 ? (
          <div className="space-y-8 mt-8">
            {searchedTopics.map((topic) => (
              <CommunityTopic key={topic._id} {...topic} showBookMark={false} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            {contents[activeTab]}
          </div>
        )
      )}
    </div>
  );
};

export default Statistics;
