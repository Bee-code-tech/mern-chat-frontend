import { useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import ChatList from "../../components/sidebar/ChatList";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="container mx-auto max-w-5xl">
      <div
        className="flex lg:max-w-6xl mx-auto gap-5 mt-2 lg:mt-8  rounded-lg"
        style={{ height: "calc(100vh - 10px)" }}
      >
        {/* cha */}
        <div
          className={`w-full !h-full  ${isSidebarOpen ? "" : "lg:block"
            } `}
        >
          <ChatList toggleSidebar={toggleSidebar} />
        </div>
      </div>
      <div className="mx-auto w-fit p-1">
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed z-[100] p-1 flex items-center justify-center ${isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div onClick={(e_) => e_.stopPropagation()} 
          className={` absolute mx-auto h-[70vh] border overflow-hidden border-green-500 rounded-xl bg-white md:max-w-[40rem] 
          lg:max-w-4xl min-w-[370px] 
          drop-shadow-lg shadow-xl dark:text-white ${isSidebarOpen ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
            <MessageContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
