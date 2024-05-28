import moment from "moment";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji, toggleSidebar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  console.log("onlineUsers:", onlineUsers);
  console.log("isOnline:", isOnline);
  console.log(selectedConversation);
  // <MessageContainer onMenuClick={toggleSidebar} />

  return (
    <>
      <div
        className={`flex md:gap-8 gap-3 lg:gap-8 items-center hover:bg-green-200 
        border-b
        rounded-lg md:p-3 p-1 lg:p-3 cursor-pointer
            ${isSelected ? "bg-green-200 text-white" : ""}
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
              <p className="font-thin text-sm text-gray-600">{conversation?.lastMessage}</p>
            </div>
            <div>
              <p className="font-bold text-xs text-gray-600">{
                conversation?.messageSendTime
                  ? moment(conversation.messageSendTime).format('hh:mm A')
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
