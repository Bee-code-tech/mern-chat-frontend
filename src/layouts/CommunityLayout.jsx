import CommunitySidebar from "../components/communitySidebar/CommunitySidebar";

const CommunityLayout = ({ children }) => {
  return (
    <div className="container mx-auto grid grid-cols-12 gap-2 mt-5">
      <div className="hidden lg:block md:col-span-2">
        <CommunitySidebar />
      </div>
      <div className="col-span-12 lg:col-span-10 px-2 xl:px-0 mb-5 mt-20">
        {children}
      </div>
    </div>
  );
};

export default CommunityLayout;
