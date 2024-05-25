import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { isBookmarked } from "../../utils/isBookmarked";
import { timeAgo } from "../../utils/timeDifference";

const CommunityTopic = (props) => {
  const { authUser } = useAuthContext();
  console.log("🚀 ~ CommunityTopic ~ authUser:", authUser);
  const {
    title,
    author,
    createdAt,
    body,
    _id,
    bookmarksUserId,
    showBookMark,
    handleBookmark,
    showDelete,
    handleDelete,
  } = props;
  const navigate = useNavigate();

  return (
    <div className="rounded-lg p-6 border ">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">{title}</h2>

        {/* <FaBookmark size={20} className="" /> */}
        {showBookMark && (
          <button onClick={() => handleBookmark({ topicId: _id })}>
            <svg
              fill={
                isBookmarked(bookmarksUserId, authUser._id) ? "#18BB0C" : "none"
              }
              stroke="#18BB0C"
              strokeWidth={20}
              strokeOpacity={1}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 381.322 381.322"
            >
              <g>
                <path
                  d="M296.582,6.053v369.21c0,2.376-1.383,4.516-3.534,5.503c-0.804,0.372-1.667,0.55-2.518,0.55
		c-1.419,0-2.838-0.503-3.961-1.472l-95.907-82.84l-95.912,82.84c-1.797,1.554-4.327,1.921-6.475,0.922
		c-2.148-0.987-3.535-3.127-3.535-5.503V6.053C84.741,2.704,87.445,0,90.793,0H290.53C293.875,0,296.582,2.704,296.582,6.053z"
                />
              </g>
            </svg>
          </button>
        )}
        {showDelete && (
          <button onClick={() => handleDelete({ topicId: _id })}>
            <FaRegTrashAlt size={20} color="red" />
          </button>
        )}
      </div>
      <div className="flex gap-4 my-4">
        <img
          className="rounded-full size-16"
          src={author.profilePic}
          alt="profileAvatar"
        />
        <div>
          <p className="text-[#666666] font-semibold text-lg">
            {author.fullName}
          </p>
          <p className="text-[#666666] font-medium">{author.designation}</p>
          <p className="text-[#999999] font-medium text-sm">
            {timeAgo(createdAt)}
          </p>
        </div>
      </div>

      <p
        className="text-[#999999] font-medium text-base line-clamp-5"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <button
        onClick={() => navigate(`/community/topics/${_id}`)}
        className="mt-3 text-[#18BB0C]"
      >
        Read more
      </button>
    </div>
  );
};

export default CommunityTopic;
