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
    <div className=" container relative  w-full mx-auto flex flex-col rounded-lg h-full">
      {selectedConversation && (
                <>
          {/* Header */}
          <div className="bg-neutral-100 flex justify-between px-4 py-4 mb-2">
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

            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a825ba294bffe070f80d45b52869881c8e1a5349169577e0943e4a7bd57e2d9?apiKey=5f2b5e956dbf4fa686f177a54d164696&"
              className="shrink-0 my-auto aspect-[0.88] w-[49px]"
            />
            
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;


