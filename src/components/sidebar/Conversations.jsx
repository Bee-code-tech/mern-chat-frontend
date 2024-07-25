import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import { getRandomEmoji } from "../../utils/emojis";
import ConversationSkeleton from "../skeletons/ConversationSkeleton";
import useGetConversations from "./../../hooks/useGetConversations";
import Conversation from "./Conversation";
import fallBack from '../../assets/forum.png'

const Conversations = ({ toggleSidebar }) => {
  const { loading, conversations } = useGetConversations();

  

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <div className="py-2 flex flex-col overflow-auto gap-4">
        {conversations.map((conversation, idx) => (
          <Conversation
            toggleSidebar={toggleSidebar}
            key={conversation._id}
            conversation={conversation}
          />
        ))}

      

        {loading ? (
          <span className="">
            {
              [...Array(7)].map((_, idx) => <ConversationSkeleton key={idx }/> )
            }
          </span>
        ) : null}

          {conversations.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                      <img
                        src={fallBack}
                        alt="emoji"
                        className="w-[450px]"
                      />
                      <p className="ml-2">Connect with others to get started!</p>
                    </div>
            )}
      </div>
    </div>
  );
};
export default Conversations;
