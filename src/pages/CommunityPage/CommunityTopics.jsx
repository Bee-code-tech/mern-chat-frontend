import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommunityTopic from "../../components/CommunityTopic/CommunityTopic";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TopicSkeleton from "../../components/skeletons/TopicSkeleton";
import picf from '../../assets/community.png'
const CommunityTopics = () => {
  const [topics, setTopics] = useState([]);
  const [refetchTopics, setRefetchTopics] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(
    "🚀 ~ handleBookmark ~ import.meta.env.VITE_BACKEND_URL:",
    import.meta.env.VITE_BACKEND_URL
  );

  console.log(topics, 'all topics here');

  useEffect(() => {
    const getTopics = async () => {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics`,
        {
          method: "GET",
          credentials: "include", // This includes cookies and other credentials in the request
        }
      );

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.msg);
      }
      setTopics(data.data);
      setTimeout(() => setLoading(false) , 2000)
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
        headers: { "Content-Type": "application/json" },
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

  console.log(topics);

  if (loading) {
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
      <div className="flex justify-end mt-4">
        <Link to='/community/topics/new'
          className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
          rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
           hover:text-white text-xl flex items-center justify-center gap-2"
        >
          <FaCirclePlus />
          Create new
        </Link>
      </div>
      {topics.length > 0 ? (
        <div className="space-y-8">
          {topics &&
            topics.map((topic) => (
              <CommunityTopic
                key={topic._id}
                {...topic}
                handleBookmark={handleBookmark}
                showBookMark={true}
              />
            ))}
        </div>
      ) : (
        <div className="flex h-[600px] justify-center flex-col w-full  items-center">
                <div className="h-full overflow-hidden md:w-[50%] lg:w-[60%] w-[100%] mx-auto flex justify-center items-center">
                <img src={picf} alt="" className="w-[100% ]  object-cover" />
                

                </div>
                <h1 className="text-xl font-bold">No Topics Yet...</h1>
              </div>
      )}
    </section>
  );
};

export default CommunityTopics;
