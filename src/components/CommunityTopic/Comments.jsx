import React from "react";
import { timeAgo } from "../../utils/timeDifference";
import defaultImg from '../../assets/hu2.png'

// testing someting 

const Comments = ({ comments, handleTopicCommentReaction }) => {
  return (
    <div>
      {comments &&
        comments.reverse().map((comment, index) => (
          <React.Fragment key={comment._id}>
            <Comment
              comment={comment}
              handleTopicCommentReaction={handleTopicCommentReaction}
            />
            {index !== comments.length - 1 && <hr className="my-8" />}
          </React.Fragment>
        ))}
    </div>
  );
};

export default Comments;

const Comment = ({ comment, handleTopicCommentReaction }) => {
  return (
    <div className="flex gap-4 my-4">
      <img
        className="rounded-full size-16"
        src={comment?.author?.profilePic || defaultImg}
        alt="profileAvatar"
      />
      <div>
        <p className="text-[#666666] font-semibold text-lg">
          {comment?.author?.username}
        </p>

        <p className="text-[#999999] font-medium text-sm">
          {timeAgo(comment?.createdAt)}
        </p>
        <p className="text-[#999999] font-medium text-base mt-4">
          {comment?.comment}
        </p>
        <button
          onClick={() => handleTopicCommentReaction({ commentId: comment._id })}
          className="flex items-center justify-center px-[20px] py-2 gap-2 border rounded-[40px] mt-4"
        >
          <img
            src="../../../public/32px-Emoji_u1f64f.svg.png"
            className="size-[20px]"
            alt=""
          />
          <div className="flex space-x-1">
            <p>{comment?.reactions?.length}</p>
            {/* <span className="text-[#18BB0C]"> 6+</span> */}
          </div>
        </button>
      </div>
    </div>
  );
};
