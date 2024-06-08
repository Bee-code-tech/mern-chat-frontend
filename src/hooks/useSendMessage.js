import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const {authUser} = useAuthContext()
  

  const sendMessage = async (message, file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", message); // Append the message
      if (file) {
        formData.append("file", file); // Append the file if present
      }
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${
          selectedConversation._id
        }`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          }, 
          body: formData,
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
