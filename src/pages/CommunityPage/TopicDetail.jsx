import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Comments from "../../components/CommunityTopic/Comments";
import { formatViewCount } from "../../utils/formatNumber";
import { timeAgo } from "../../utils/timeDifference";
import defaultImg from '../../assets/hu2.png'
import { FaCirclePlus } from "react-icons/fa6";

const TopicDetail = () => {
  const [topic, setTopic] = useState({});
  console.log("🚀 ~ TopicDetail ~ topic:", topic);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL
        }/api/community/topics/comment/${id}`,
        {
          method: "GET",
          credentials: "include", // This includes cookies and other credentials in the request
        }
      );

      const data = await res.json();
      console.log("🚀 ~ getTopicCategory ~ data:", data);
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
          credentials: "include", // This includes cookies and other credentials in the request
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
          `${import.meta.env.VITE_BACKEND_URL
          }/api/community/topics/incrementViewCount/${id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
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


  // const onSubmit = (data) => postComment({ ...data, topicId: id });

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const postComment = async (e) => {
    // e.preventDefault();
    if (!commentText) {
      return toast.error("Comment cannot be empty");
    }

    const payload = { comment: commentText, topicId: id };

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/community/topics/comment`,
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
    setRefetch(!refetch);
  };

  const handleTopicReaction = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL
      }/api/community/topics/reactions/toggle`,
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
    setRefetch(!refetch);
  };
  const handleTopicCommentReaction = async (payload) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL
      }/api/community/topics/comment/reactions/toggle`,
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
    setRefetch(!refetch);
  };

  return (
    <div className="shadow-lg rounded-lg p-6 mb-5 lg:mx-10">
      <div className="rounded-lg border p-6">
        <h2 className="font-bold text-xl">{topic.title}</h2>
        <div className="flex gap-4 my-4">
          <img
            className="rounded-full size-16"
            src={topic?.author?.profilePic || defaultImg}
            alt="profileAvatar"
          />
          <div>
            <p className="text-[#666666] font-semibold text-lg">
              {topic?.author?.fullName}
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
      <div className="my-6 font-medium text-[#999999] text-[15px] flex gap-4 items-center">
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
        <button
          onClick={() => handleTopicReaction({ topicId: topic._id })}
          className="flex items-center justify-center px-[20px] py-4 gap-2 border rounded-[40px]"
        >
          <img
            src="../../../public/32px-Emoji_u1f64f.svg.png"
            className="size-[20px]"
            alt=""
          />
          <div className="flex space-x-1">
            <p>{topic?.reactions?.length}</p>
            {/* <span className="text-[#18BB0C]"> 6+</span> */}
          </div>
        </button>
      </div>
      <hr className="my-8" />
      <div className="my-8 flex justify-between items-center">
        <p className="font-medium text-2xl">Comments ({comments.length}):</p>
       
            <button
             className="border transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 
             rounded-lg border-[#18BB0C] px-3 py-2 text-[#18BB0C] hover:bg-[#18BB0C]
              hover:text-white text-sm flex items-center justify-center gap-2"
             onClick={()=>document.getElementById('my_modal_1').showModal()}>
               <FaCirclePlus />
            Add Comment
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
                        className="g-gray-50 mb-3 w-full h-[150px] border border-gray-400 text-gray-900 
                        text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5"
                        value={commentText}
                        onChange={handleInputChange}
                        >                       
                      </textarea>                  
                <button 
                 
                onClick={()=>postComment(commentText)}
                className="bg-[#18BB0C] mt-2  transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110  px-4 py-2 rounded-md text-white ml-[270px] ">
                  Add
                  </button>
              </form>

            </div>
          </div>
      </dialog> 
      
     

      {/* <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
                  {/*header*/}
                  {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Comment</h3>
                  </div> */}
                  {/*body*/}
                  {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative p-6 flex-auto">
                      <textarea
                        {...register("comment")}
                        className="g-gray-50 border border-gray-[#18BB0C] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        name="comment"
                        cols="50"
                        rows="5"
                      ></textarea>
                    </div>
                    {/*footer*/}
                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Add
                      </button>
                    </div> */}
                  {/* </form>
                </div>
              </div>
            </div> */}
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}  
      </> */}
    </div>
  );
};

export default TopicDetail;
