import CommunitySidebar from "../components/communitySidebar/CommunitySidebar";

const CommunityLayout = ({ children }) => {
  return (
    <div className="  w-full grid grid-cols-12 items-center justify-center gap-2 mt-5">
      <div className="hidden lg:col-span-4 lg:block overflow-hidden md:col-span-0">
        <CommunitySidebar />
      </div>
      <div className="col-span-12 w-full lg:col-span-8 md:col-span-12 px-3 lg:px-10 md:px-10 xl:px-10 mb-5 mt-20 ">
        {children}
      </div>
    </div>
  );
};

export default CommunityLayout;
