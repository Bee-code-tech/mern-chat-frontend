import moment from "moment";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { timeAgo } from "../../utils/timeDifference";
import { useAuthContext } from "../../context/AuthContext";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import { useState, useEffect } from "react";

const Conversation = ({ conversation, toggleSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages } = useGetMessages();
  const [latestMessage, setLatestMessage] = useState(null);

  useListenMessages();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const isOnline = onlineUsers.includes(conversation._id);

  useEffect(() => {
    console.log("messages:", messages);
    console.log("conversation:", conversation);
    console.log("authUser:", authUser);
    console.log('latestemessage: ', latestMessage);
  
    const mySenderMessages = messages.filter(
      message => message?.senderId === conversation?._id && message?.receiverId === authUser?._id
    );

    const latest = mySenderMessages.length > 0 
      ? mySenderMessages[mySenderMessages.length - 1] 
      : { message: conversation?.lastMessage, createdAt: conversation?.messageSendTime };

    setLatestMessage(latest);
  }, [messages, conversation, authUser]);
  

  console.log('latestMessage outside:', latestMessage);

  return (
    <>
      <div
        className={`flex md:gap-8 gap-3 lg:gap-8 items-center hover:bg-green-200 
        border-b
        rounded-lg md:p-3 p-1 lg:p-3 cursor-pointer
            ${isSelected ? "" : ""}
            `}
        onClick={() => {
          setSelectedConversation(conversation);
          toggleSidebar();
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src={conversation.profilePic} alt={conversation.fullName} />
          </div>
        </div>

        <div className="flex flex-col mb-2 flex-1">
          <div className="flex justify-between">
            <div className="flex gap-3 flex-col">
              <p className="font-bold text-gray-600">{conversation.fullName}</p>
              <p className="font-thin text-sm text-gray-600">{latestMessage?.message ? `${conversation.fullName} : ${latestMessage.message}` : `Start Chatting  "${conversation.fullName}"`}</p>
            </div>
            <div>
              <p className="font-bold text-xs text-gray-600">{
                latestMessage?.createdAt
                  ? timeAgo(latestMessage.createdAt)
                  : ''
              }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
