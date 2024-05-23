import { BiLogOut } from "react-icons/bi";
import { CiBellOn, CiBookmark, CiStar } from "react-icons/ci";
import { FiBook, FiUser, FiUsers } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { TfiGallery } from "react-icons/tfi";


const CommunitySidebar = ({ toggleMenu }) => {
  const { logout } = useLogout();
  const { pathname } = useLocation();
  return (
    <div
      className="flex flex-col justify-between  top-20 bg-white fixed pl-1 md:pl-0 w-[180px] xl:w-[200px]"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div>
        {sidebarMenuItems.map((item) => (
          <NavLink
            to={item.url}
            key={item.name}
            className={({ isActive }) =>
              isActive ? "text-[#18BB0C]" : "text-[#999999] "
            }
          >
            <div onClick={toggleMenu}>
              <div className="flex items-center font-medium space-x-4 my-5">
                <span>{item.icon}</span>
                <span className="!truncate">{item.name}</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      <div>
        {/* <Link to={"/help"}>
          <div
            onClick={toggleMenu}
            className={`${
              pathname === "/help" && "text-[#18BB0C]"
            } flex items-center font-medium space-x-4 text-[#999999] my-5`}
          >
            <span>
              <IoHelpCircleOutline size={24} />
            </span>
            <span>Help & Support</span>
          </div>
        </Link>
        <Link to={"/settings"}>
          <div
            onClick={toggleMenu}
            className={`${
              pathname === "/settings" && "text-[#18BB0C]"
            } flex items-center font-medium space-x-4 text-[#999999] my-5`}
          >
            <span>
              <GoGear size={24} />
            </span>
            <span>Settings</span>
          </div>
        </Link> */}
        <div
          onClick={() => {
            logout();
            toggleMenu();
          }}
          className={`${
            pathname === "/settings" && "text-[#18BB0C]"
          } flex items-center cursor-pointer font-medium space-x-4 text-[#999999] my-5`}
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
    url: "/community/home",
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
    url: "/chatpage",
  },
  {
    name: "Notifications",
    icon: <CiBellOn size={24} />,
    url: "/community/notifications",
  },
  {
    name: "Profile (Community)",
    icon: <FiUser size={24} />,
    url: "/community/profile",
  },
  {
    name: "Gallery",
    icon: <TfiGallery size={24}/>,
    url: "/community/gallery",
  },
];
