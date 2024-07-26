
// import ConversationSkeleton from "../skeletons/ConversationSkeleton";
// import useGetConversations from "./../../hooks/useGetConversations";
// import Conversation from "./Conversation";
// import fallBack from '../../assets/forum.png'

// const Conversations = ({ toggleSidebar }) => {
//   const { loading, conversations } = useGetConversations();

//   console.log('converseation', conversations);

//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       <div className="py-2 flex flex-col overflow-auto gap-4">
//         {conversations.map((conversation, idx) => (
//           <Conversation
//             toggleSidebar={toggleSidebar}
//             key={conversation._id}
//             conversation={conversation}
//           />
//         ))}
//         {loading ? (
//           <span className="">
//             {
//               [...Array(7)].map((_, idx) => <ConversationSkeleton key={idx }/> )
//             }
//           </span>
//         ) : null}

//           {conversations.length === 0 && (
//                     <div className="flex items-center flex-col justify-center">
//                       <img
//                         src={fallBack}
//                         alt="emoji"
//                         className="w-[450px]"
//                       />
//                       <p className="ml-2">Connect with others to get started!</p>
//                     </div>
//             )}
//       </div>
//     </div>
//   );
// };
// export default Conversations;

import ConversationSkeleton from "../skeletons/ConversationSkeleton";
import useGetConnections from "../../hooks/useGetConnections";
import Conversation from "./Conversation";
import fallBack from '../../assets/forum.png';
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = ({ toggleSidebar }) => {
  const { loading: conversationsLoading, conversations } = useGetConversations();
  const { loading: connectionsLoading, connections } = useGetConnections();

  const getConnectionStatus = (userId) => {
    const connection = connections.find(conn => 
      (conn.requester._id === userId || conn.recipient._id === userId) &&
      conn.status
    );
    return connection ? connection.status : null;
  };

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <div className="py-2 flex flex-col overflow-auto gap-4">
        {(conversationsLoading || connectionsLoading) ? (
          <span className="">
            {[...Array(7)].map((_, idx) => <ConversationSkeleton key={idx} />)}
          </span>
        ) : (
          conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              status={getConnectionStatus(conversation._id)}
              toggleSidebar={toggleSidebar}
            />
          ))
        )}
        {!conversationsLoading && conversations.length === 0 && (
          <div className="flex items-center flex-col justify-center">
            <img src={fallBack} alt="emoji" className="w-[450px]" />
            <p className="ml-2">Connect with others to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
