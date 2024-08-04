import { format, parseISO, set } from "date-fns";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Comments from "../../components/CommunityTopic/Comments";
import { formatViewCount } from "../../utils/formatNumber";
import { timeAgo } from "../../utils/timeDifference";
import defaultImg from '../../assets/hu2.png';
import { FaAngleLeft, FaCirclePlus, FaSpinner } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import ThankYou from "../../components/Modal/ThankYou";

const TopicDetail = () => {
  const [topic, setTopic] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false)
  const [isThanksOpen, setIsThanksOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { authUser } = useAuthContext();
  const [showThanks, setShowThanks] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

  const handleModalClose = () => {
    setIsThanksOpen(false);
  };

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleModal = () => {
    setShowThanks(true);
  };

  const handleModalOpen = () => {
    setIsThanksOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };
   const handleCommentModalShow = () => {
    setShowCommentModal(true);
   }
   const handleCommentModalClose = () => {
    setShowCommentModal(false);
   }

  const postComment = async () => {
    if (!commentText) {
      return toast.error("Comment cannot be empty");
    }
    setCommentLoading(true);

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
    setCommentText("");
    setCommentLoading(false);
    setShowCommentModal(false)
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

  const sendThanks = async () => {
    await handleTopicReaction({ topicId: topic._id });
  };

  return (
    <>
    {showCommentModal && (
  <div 
  onClick={()=> handleCommentModalClose()}
  className={`fixed z-[100] p-5 flex items-center justify-center ${showCommentModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
  
  >
    <div 
     onClick={(e) => e.stopPropagation()}
    className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md ${showCommentModal ? 'scale-1 opacity-1 duration-500' : 'scale-0 opacity-0 duration-150'}`}>
      <h3 className="text-2xl font-bold mb-4 text-center">Comment on this post</h3>
      <textarea
        className="w-full p-4 border rounded-md mb-4 h-32"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => handleInputChange(e)}
      ></textarea>
      <div className="flex justify-end items-center mt-4">
        <button
          className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${commentLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={postComment}
          disabled={commentLoading}
        >
          {commentLoading ? <FaSpinner className="animate-spin" /> : "Post Comment"}
        </button>
      
      </div>
    </div>
  </div>
)}

      <div className="container mx-auto ml-10  flex justify-start items-center">
        <div onClick={handleBack}>
          <button className="btn bg-[#18BB0C] text-white">
            <span className="flex items-center">
              <FaAngleLeft color="white" size="1.2em" />
              <span>Back</span>
            </span>
          </button>
        </div>
      </div>
      <div className="shadow-lg rounded-lg p-6 mb-5 lg:mx-10">
        <ThankYou
          isOpen={isThanksOpen}
          onClose={handleModalClose}
          id={topic?.author?._id}
          img={topic?.author?.profilePic}
          name={topic?.author?.username}
          sendThanks={sendThanks}
        />

        <div className="rounded-lg border p-6">
          <h2 className="font-bold text-xl">{topic?.title}</h2>
          <div className="flex gap-4 my-4">
            <img
              onMouseEnter={handleModalOpen}
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
              <div className="absolute bg-white shadow-lg px-2 flex gap-1 z-10 h-auto w-auto rounded-lg -bottom-12 -right-24">
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
            onClick={() => handleCommentModalShow()}
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

      

       
      </div>
    </>
  );
};

export default TopicDetail;
