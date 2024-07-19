import { BiLogOut } from "react-icons/bi";
import { CiBellOn, CiBookmark, CiGlobe, CiSettings, CiStar } from "react-icons/ci";
import { FiBook, FiUser, FiUsers } from "react-icons/fi";
import { IoHomeOutline, IoStatsChartOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { MdConnectWithoutContact } from "react-icons/md";
import { BsRocketTakeoff } from "react-icons/bs";


const CommunitySidebar = ({ toggleMenu }) => {
  const { logout } = useLogout();
  const { pathname } = useLocation();
  return (
    <div
      className="flex z-40 flex-col items-center bg-white -ml-8 pt-10 justify-between top-20 bottom-0 fixed border-r lg:w-[370px] w-[330px]  "
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex items-start justify-center flex-col gap-1">
        {sidebarMenuItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.name}
            className={({ isActive }) =>
              isActive ? "text-[#18BB0C]  " : "text-[#999999] "
            }
          >
            <div onClick={toggleMenu}>
              <div className="flex items-center font-medium space-x-4 my-[14px]">
                <span>{item.icon}</span>
                <span className="!truncate">{item.name}</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div>
        
        <div
          onClick={() => {
            logout();
            toggleMenu();
          }}
          className={`${pathname === "/settings" && "text-[#18BB0C]"
            } flex items-center cursor-pointer mb-20 font-medium space-x-4 text-[#999999] my-5`}
        >
          <span>
            <BiLogOut color="red" size={24} />
          </span>
          <span className="text-red-500">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;

const sidebarMenuItems = [
  {
    name: "Home",
    icon: <IoHomeOutline size={24} />,
    url: "/",
  },
  {
    name: "Topics",
    icon: <FiBook size={24} />,
    url: "/community/topics",
  },
  {
    name: "Contributions",
    icon: <CiStar size={24} />,
    url: "/community/contributions",
  },
  {
    name: "Bookmarks",
    icon: <CiBookmark size={24} />,
    url: "/community/bookmarks",
  },
  {
    name: "Community Circle ",
    icon: <FiUsers size={24} />,
    url: "/chatPage",
  },
  // {
  //   name: "Connect",
  //   icon: <MdConnectWithoutContact size={24} />,
  //   url: "/community/connect",
  // },
  // {
  //   name: "Requests",
  //   icon: <BsRocketTakeoff size={24} />,
  //   url: "/community/requests",
  // },

  {
    name: "Notifications",
    icon: <CiBellOn size={24} />,
    url: "/notification",
  },
  {
    name: 'Profile (community)',
    icon:  <FiUser size={24} />,
    url: "/community/statistics",
  },
  
  {
    name: "Settings",
    icon: <CiSettings size={24} />,
    url: "/community/profile",
  },
];
