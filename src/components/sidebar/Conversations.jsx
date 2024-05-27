import { getRandomEmoji } from "../../utils/emojis";
import useGetConversations from "./../../hooks/useGetConversations";
import Conversation from "./Conversation";

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
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))}

        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </div>
  );
};
export default Conversations;
