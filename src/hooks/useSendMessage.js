import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message, file) => {
    setLoading(true);
    try {
      let endpoint;
      let body;
      let headers = {
        Authorization: `Bearer ${authUser.token}`,
      };

      if (file) {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("file", file);

        if (file.type.startsWith("image/")) {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/messages/image/send/${selectedConversation._id}`;
        } else if (file.type.startsWith("video/")) {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/messages/video/send/${selectedConversation._id}`;
        } else if (
          file.type === "application/pdf" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/messages/document/send/${selectedConversation._id}`;
        } else {
          throw new Error("Unsupported file type");
        }

        body = formData;
      } else {
        endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`;
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ message });
      }

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers,
        body,
      });

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
