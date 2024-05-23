import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommunityTopic from "../../components/CommunityTopic/CommunityTopic";

const Contributions = () => {
  const [topics, setTopics] = useState([]);
  const [refetchTopics, setRefetchTopics] = useState(false);

  useEffect(() => {
    const getTopics = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/me`,
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
    };
    getTopics();
  }, [refetchTopics]);

  const handleDelete = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics`,
      {
        method: "DELETE",
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

  return (
    <section className="space-y-5 px-10">
      <div className="flex justify-end">
        <a
          href="/community/topics/new"
          className="border border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C] hover:text-white text-xl"
        >
          Create new
        </a>
      </div>
      {topics.length > 0 ? (
        <div className="space-y-8">
          {topics &&
            topics.map((topic) => (
              <CommunityTopic
                key={topic._id}
                {...topic}
                showDelete={true}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      ) : (
        <div className="w-full mt-20 flex items-center justify-center text-[#bb350c]">
          No contributions yet...
        </div>
      )}
    </section>
  );
};

export default Contributions;
