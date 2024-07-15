import { format, parseISO } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Comments from "../../components/CommunityTopic/Comments";
import { formatViewCount } from "../../utils/formatNumber";
import { timeAgo } from "../../utils/timeDifference";
import defaultImg from '../../assets/hu2.png';
import { FaCirclePlus } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";

const TopicDetail = () => {
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { authUser } = useAuthContext();
  const [showThanks, setShowThanks] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/comment/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.msg);
      }
      setComments(data.data);
    };
    getComments();
  }, [id, refetch]);

  useEffect(() => {
    const getTopic = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!data.success) {
        return toast.error(data.msg);
      }
      setTopic(data.data);
    };
    getTopic();
  }, [id, refetch]);

  useEffect(() => {
    const incrementTopicView = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/incrementViewCount/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authUser?.token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error incrementing topic view:", error);
      }
    };

    incrementTopicView();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowThanks(false);
      }
    };

    if (showThanks) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showThanks]);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleModal = () => {
    setShowThanks(true);
  };

 

  const postComment = async () => {
    if (!commentText) {
      return toast.error("Comment cannot be empty");
    }

    const payload = { comment: commentText, topicId: id };

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/comment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }

    toast.success(data.msg);
    setRefetch(!refetch);
  };

  const handleTopicReaction = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/reactions/toggle`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }

    toast.success(data.msg);
    setRefetch(!refetch);
  };

  const handleTopicCommentReaction = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/comment/reactions/toggle`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return toast.error(data.msg);
    }

    toast.success(data.msg);
    setRefetch(!refetch);
  };

  return (
    <div className="shadow-lg rounded-lg p-6 mb-5 lg:mx-10">
      <div className="rounded-lg border p-6">
        <h2 className="font-bold text-xl">{topic?.title}</h2>
        <div className="flex gap-4 my-4">
          <img
            className="rounded-full size-16"
            src={topic?.author?.profilePic || defaultImg}
            alt="profileAvatar"
          />
          <div>
            <p className="text-[#666666] font-semibold text-lg">
              {topic?.author?.username}
            </p>
            <p className="text-[#666666] font-medium">
              {topic?.author?.designation}
            </p>
            <p className="text-[#999999] font-medium text-sm">
              {timeAgo(topic?.createdAt)}
            </p>
          </div>
        </div>

        <p
          className="text-[#999999] font-medium text-base"
          dangerouslySetInnerHTML={{ __html: topic?.body }}
        />
      </div>
      <div className="my-6 font-medium text-[#999999] text-[15px] flex flex-row flex-wrap lg:flex-row md:flex-row gap-4 items-center">
        {topic.createdAt && (
          <p>{format(parseISO(topic.createdAt), "h:mm a")}</p>
        )}
        <div className="size-1 bg-[#999999] rounded-full"></div>
        {topic.createdAt && (
          <p>{format(parseISO(topic.createdAt), "MMM d, yyyy")}</p>
        )}
        <div className="size-1 bg-[#999999] rounded-full"></div>
        <p>
          <span className="text-[#666666] text-[17px]">
            {formatViewCount(topic?.viewedBy?.length)}
          </span>{" "}
          views
        </p>
        <div className="size-1 bg-[#999999] rounded-full"></div>
        <p>
          <span className="text-[#666666] text-[17px]">{comments?.length}</span>{" "}
          Comments
        </p>
        <div className="size-1 bg-[#999999] rounded-full"></div>

        <div className="relative" ref={modalRef}>
          <button
            onMouseEnter={handleModal}
            className="flex items-center justify-center px-[24px] py-1 gap-2 border rounded-[40px]"
          >
            <p className="text-2xl"> 🙏 </p>
            <div className="flex space-x-1">
              <p>{topic?.reactions?.length}</p>
            </div>
          </button>

          {showThanks && (
            <div className="absolute bg-white shadow-lg px-2 flex gap-1 z-30 h-auto w-auto rounded-lg -bottom-12 -right-24">
              <button
                onClick={() => handleTopicReaction({ topicId: topic._id })}
                className="flex items-center hover:scale-110 duration-150 transition ease-in-out justify-center px-2 py-2"
              >
                <p className="text-2xl"> 🙏 </p>
              </button>
              <button
                onClick={() => handleTopicReaction({ topicId: topic._id })}
                className="flex items-center justify-center px-2 py-2 gap-2 hover:scale-110 duration-150 transition ease-in-out"
              >
                <p className="text-2xl"> 🙏🏽 </p>
              </button>
              <button
                onClick={() => handleTopicReaction({ topicId: topic._id })}
                className="flex items-center justify-center px-2 py-2 gap-2 hover:scale-110 duration-150 transition ease-in-out"
              >
                <p className="text-2xl"> 🙏🏿 </p>
              </button>
              <button
                onClick={() => handleTopicReaction({ topicId: topic._id })}
                className="flex items-center justify-center px-2 py-2 gap-2 hover:scale-110 duration-150 transition ease-in-out"
              >
                <p className="text-2xl"> 🙏🏾 </p>
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="my-8" />
      <div className="my-8 flex justify-between items-center">
        <p className="font-medium text-2xl">Comments ({comments.length}):</p>
        <button
          className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C] hover:text-white text-sm flex items-center justify-center gap-2"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          <FaCirclePlus /> Add Comment
        </button>
      </div>
      <div>
        <Comments
          comments={comments}
          handleTopicCommentReaction={handleTopicCommentReaction}
        />
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comment</h3>
          <div className="modal-action flex-col">
            <form method="dialog">
              <textarea
                className="bg-gray-50 mb-3 w-full h-[150px] border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                value={commentText}
                onChange={handleInputChange}
              ></textarea>
              <button
                onClick={postComment}
                className="bg-[#18BB0C] mt-2 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 px-4 py-2 rounded-md text-white ml-[270px]"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TopicDetail;
