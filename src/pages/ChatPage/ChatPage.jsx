import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/sidebar";
const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="container mx-auto max-w-5xl">
      <div
        className="flex  lg:max-w-6xl mx-auto gap-5 mt-2 lg:mt-32  rounded-lg  max-w-6xl "
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Sidebar */}
        <div
          className={`w-full !h-full  ${isSidebarOpen ? "" : "hidden lg:block"
            } `}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>
      </div>
      <div className="mx-auto w-fit">
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed z-[100] flex items-center justify-center ${isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute h-screen rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${isSidebarOpen ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
            <MessageContainer onMenuClick={toggleSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
