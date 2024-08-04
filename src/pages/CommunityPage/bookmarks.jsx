import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommunityTopic from "../../components/CommunityTopic/CommunityTopic";
import TopicSkeleton from "../../components/skeletons/TopicSkeleton";
import picf from '../../assets/book.png'
import { useAuthContext } from "../../context/AuthContext";

const Bookmarks = () => {
  const [topics, setTopics] = useState([]);
  console.log("🚀 ~ Bookmarks ~ topics:", topics);
  const [refetchTopics, setRefetchTopics] = useState(false);
  const [loading, setLoading] = useState(false);
const {authUser} = useAuthContext()  

  useEffect(() => {
    const getTopics = async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/community/topics?bookmarks=true`,
        {
          method: "GET",
          credentials: "include", 
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          }  
        }
      );

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.msg);
      }
       setLoading(false),
      setTopics(data.data);
    };
    getTopics();
  }, [refetchTopics]);

  const handleBookmark = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL
      }/api/community/topics/bookmarks/toggle`,
      {
        method: "POST",
        credentials: "include",
        headers: { 
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }
    toast.success(data.msg);
    setRefetchTopics(!refetchTopics);
  };


  if (loading){
    return (
      <div className="flex items-start flex-col gap-4 justify-center mt-8" role="status">
        {
          [...Array(3)].map((_, idx) => <TopicSkeleton key={idx} />)
        }
      </div>
    );
  }

  return (
    <section className="space-y-5 px-3">
      {topics.length > 0 ? (
        <div className="space-y-8" >
          {topics &&
            topics.map((topic) => (
              <CommunityTopic
                key={topic._id}
                {...topic}
                showBookMark={true}
                handleBookmark={handleBookmark}
              />
            ))}
        </div>
      ) : (
        <div className="flex h-screen -mt-[100px] justify-center flex-col w-full items-center">
          <div className="rounded-lg p-8 border border-slate-300 ">
          <h1 className="text-xl  font-bold">You have no bookmarkss yet</h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default Bookmarks;
