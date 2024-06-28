import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from './../skeletons/MessageSkeleton';
import useListenMessages from "../../hooks/useListenMessages";
import moment from "moment";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    console.log(messages);
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);
    return (
        <div className='p-3  flex-1 flex-col overflow-auto m-4 rounded-xl border border-neutral-200 '>

           <div className="flex items-center justify-center  flex-initial px-2 py-2.5 text-sm leading-7 bg-white  rounded-lg shadow-lg  text-stone-500 ">
              {moment().format('MMMM').toUpperCase()}
            </div>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef} className="">
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;