import React, { useState } from "react";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../assets/Biopic.png";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import CommunitySidebar from "../communitySidebar/CommunitySidebar";
import defaultImg from '../../assets/hu2.png';

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(authUser);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg w-screen fixed flex items-center z-50 h-20 top-0 lg:px-10 px-0 md:px-10">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={logoImage} alt="Logo" className="lg:h-8 md:h-8 h-[26px] mt-2 " />
            </Link>
          </div>

      

          <div className="flex items-center">

           
         
            {authUser ? (
              <>
                 <div className="flex items-center justify-center gap-2 border border-gray-300 p-0 lg:p-0.5 rounded-full">
                    {/* Profile picture dropdown menu  */}
                      <div className="flex-none">
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 lg:w-10 rounded-full">
                                  <img alt="Tailwind CSS Navbar component" src={authUser.profilePic || defaultImg } />
                                </div>
                              </div>
                              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-6 z-[1] p-4  bg-base-100 rounded-box w-[300px] shadow-md ">

                                <li className="h-10 font-light p-2">
                                    <a>
                                      <IoHomeOutline  className="w-6 h-6 text-black cursor-pointer" />
                                      <Link to='/' className="justify-between">
                                        Home
                                      </Link>
                                    </a>
                                </li>

                                <li className="h-10 font-light p-2">
                                  <a >
                                    <CiSettings  className="w-6 h-6 text-black cursor-pointer" />
                                    <Link to='' className="justify-between">
                                        Settings
                                    </Link>
                                  </a>
                                </li>


                                <li className="h-10 font-light p-2">
                                     <a>
                                      <CgProfile  className="w-6 h-6 text-black cursor-pointer"/>
                                        <Link to='/community/profile' className="justify-between">
                                          Profile
                                        </Link>
                                     </a>
                                </li>

                                <li  className="h-10 font-light p-2"><a>
                                  
                                {!loading ? (
                                <>
                                  <span className="">

                                  <BiLogOut
                                    className="w-6 h-6 text-black cursor-pointer"
                                    onClick={logout}
                                    />
                                  </span>
                                </>
                                  ) : (
                                 <span className="loading loading-spinner"></span>
                                  )}
                                  Logout </a>
                                </li>
                                  
                              </ul>
                            </div>
                      </div> 

                     {/* userName     */}
                     <p className="mr-4 hidden md:block lg:block">{authUser.username}</p>
                  </div>            
              </>
            ) : (
              <>
              
              <div className="flex gap-3"> 
            <Link to={'/login'} className="px-4 py-1.5 flex  items-center justify-center  border border-green-600 rounded-lg text-neutral-500"> Login </Link>
            <Link to={'/signup'} className="px-4 py-1.5 flex items-center justify-center text-white border bg-green-600 rounded-lg"> Sign Up </Link>
            </div>
              </>
            )
          }

          
          {
            authUser && (
              <>
              {isMenuOpen ? (
                      <div className="lg:hidden">
                        <BiX
                          className="w-8 h-8 text-gray-700 cursor-pointer"
                          onClick={toggleMenu}
                        />
                      </div>
                    ) : (
                      <div className="lg:hidden">
                        <BiMenu
                          className="w-8 h-8 text-gray-700 cursor-pointer"
                          onClick={toggleMenu}
                        />
                      </div>
                    )}
              </>
            )
          }
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden">
          <CommunitySidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      )}
    </>
  );
};

export default Navbar;

