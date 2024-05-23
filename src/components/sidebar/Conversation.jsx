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
        className={`flex gap-2 border items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-500" : ""}
            `}
        onClick={() => {
          setSelectedConversation(conversation);
          toggleSidebar();
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt={conversation.fullName} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div className="flex gap-1 flex-col">
              <p className="font-bold text-gray-600">{conversation.fullName}</p>
              <p className="font-thin text-xs text-gray-600">{conversation?.lastMessage}</p>
            </div>
            <div>
              <p className="font-bold text-xs text-gray-600">{
                conversation?.messageSendTime
                  ? new Date(conversation.messageSendTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  : ''
              }</p>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
