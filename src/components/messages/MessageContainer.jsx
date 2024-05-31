import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[600px] lg:min-w-[700px] w-[460px]  flex flex-col rounded-lg h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-200 px-4 py-4 mb-2">
            <div className="flex gap-4">
              <img
                src={selectedConversation.profilePic}
                style={{ height: "60px", width: "60px" }}
              />
              {/* Info anout the user */}
              <div className="flex flex-col items-center justify-center">
              <span className="text-gray-900 font-bold capitalize">
                {selectedConversation.fullName}
              </span>
              <span className="text-gray-900 text-sm font-thin capitalize">
               online
              </span>
              </div>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
