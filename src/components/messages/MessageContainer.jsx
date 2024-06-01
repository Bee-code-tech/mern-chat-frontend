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
    <div className="md:max-w-[40rem] container  lg:max-w-4xl max-w-[380px] mx-auto  flex flex-col rounded-lg h-full">
      {selectedConversation && (
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


