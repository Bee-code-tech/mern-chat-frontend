import { BiLogOut } from "react-icons/bi";
import { CiBellOn, CiBookmark, CiStar } from "react-icons/ci";
import { FiBook, FiUser, FiUsers } from "react-icons/fi";
import { IoHomeOutline, IoStatsChartOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { MdConnectWithoutContact } from "react-icons/md";


const CommunitySidebar = ({ toggleMenu }) => {
  const { logout } = useLogout();
  const { pathname } = useLocation();
  return (
    <div
      className="flex z-40 flex-col items-center -ml-8 pt-10 justify-between top-14 bottom-0 fixed border-r lg:w-[350px] w-[330px]  xl:w-[450px] bg-white"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex flex-col gap-1">
        {sidebarMenuItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.name}
            className={({ isActive }) =>
              isActive ? "text-[#18BB0C]  " : "text-[#999999] "
            }
          >
            <div onClick={toggleMenu}>
              <div className="flex items-center font-medium space-x-4 my-4">
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
    name: "Community Circle",
    icon: <FiUsers size={24} />,
    url: "/chatPage",
  },
  {
    name: "Connect",
    icon: <MdConnectWithoutContact size={24} />,
    url: "/community/connect",
  },
  {
    name: 'Statistics',
    icon:  <IoStatsChartOutline size={24} />,
    url: "/community/statistics",
  },
  {
    name: "Notifications",
    icon: <CiBellOn size={24} />,
    url: "/notification",
  },
  {
    name: "My Profile",
    icon: <FiUser size={24} />,
    url: "/community/profile",
  },
];
