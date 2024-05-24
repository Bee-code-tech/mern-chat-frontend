import React from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = ({ toggleSidebar }) => {
  const handleClick = (e) => {
    // Prevent click propagation to parent
    e.stopPropagation();
  };

  return (
    <div
      className="border h-full overflow-y-auto rounded-lg w-full p-4 flex flex-col"
      onClick={handleClick}
    >
      {/* <SearchInput /> */}
      <div className="divider px-3"></div>
      <Conversations toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Sidebar;
