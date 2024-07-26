import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import moment from "moment";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { timeAgo } from "../../utils/timeDifference";
import { useAuthContext } from "../../context/AuthContext";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import ConnectRequestModal from "../Modal/ConnectRequestModal";
import pic from '../../assets/circle.png'

const Conversation = ({ conversation, toggleSidebar, status }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages } = useGetMessages();
  const [latestMessage, setLatestMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useListenMessages();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const isOnline = onlineUsers.includes(conversation._id);

  useEffect(() => {
    if (authUser?._id) {
      const relevantMessages = messages.filter(
        message =>
          (message.senderId === conversation._id && message.receiverId === authUser._id) ||
          (message.senderId === authUser._id && message.receiverId === conversation._id)
      );

      const latest = relevantMessages.length > 0
        ? relevantMessages[relevantMessages.length - 1]
        : { message: conversation?.lastMessage, createdAt: conversation?.messageSendTime };

      setLatestMessage(latest);
    }
  }, [messages, conversation, authUser]);

  const handleConnectClick = () => {
    setModalIsOpen(true);
  };

  const handleAcceptReject = async (accept) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/connect/${accept ? 'acceptRequest' : 'rejectRequest'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({ requesterId: conversation._id, notificationId: conversation._id }), // Use appropriate IDs
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }
      setModalIsOpen(false);

      toast.success(`Friend request ${accept ? 'accepted' : 'rejected'}`);
    } catch (error) {
      toast.error('Error accepting friend request');
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div
      className={`relative flex md:gap-8 gap-3 lg:gap-8 items-center hover:bg-green-200
        border-b rounded-lg md:p-3 p-1 lg:p-3 cursor-pointer ${isSelected ? "" : ""}`}
      onClick={() => {
        if (status === 'accepted') {
          setSelectedConversation(conversation);
          toggleSidebar();
        } else {
          handleConnectClick();
        }
      }}
    >
      <div className={` avatar ${isOnline ? "onliney" : status === 'pending' ? "pending" : "offline-stat"}`}>
        <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-full">
          <img src={conversation.profilePic} alt={conversation.username} className="object-cover w-full" />
        </div>
        {status === 'pending' && (
          <div className="absolute w-[18px] -bottom-0 -right-1">
  <img
    src={pic}
    className="w-[9px] "
  />

          </div>
        )}
      </div>

      <div className="flex flex-col mb-2 flex-1">
        <div className="flex justify-between">
          <div className="flex gap-3 flex-col">
            <p className="font-bold text-gray-600">{conversation.username}</p>
            <p className="font-thin text-sm capitalize text-gray-600">
              {status === 'pending' ? (
                <span className="text-green-500 cursor-pointer">
                  {`${conversation.username} wants to connect`}
                </span>
              ) : latestMessage?.message ? latestMessage.message : `Start Chatting with "${conversation.username}"`}
            </p>
          </div>
          <div>
            <p className="font-bold text-xs text-gray-600">
              {latestMessage?.createdAt ? timeAgo(latestMessage.createdAt) : ""}
            </p>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <ConnectRequestModal
          username={conversation.username}
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onAccept={() => handleAcceptReject(true)}
          onReject={() => handleAcceptReject(false)}
        />
      )}
    </div>
  );
};

export default Conversation;
