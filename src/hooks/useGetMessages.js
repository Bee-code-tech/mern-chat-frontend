

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const {authUser} = useAuthContext()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/${
            selectedConversation._id
          }`,
          {
            method: "GET",
            credentials: "include", 
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            }
            // This includes cookies and other credentials in the request
          }
        );
        const data = await res.json();
        console.log("Fetched messages:", data); // Add this debug log

        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  const downloadFile = async (filename) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/${filename}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
          credentials: "include", // This includes cookies and other credentials in the request
        }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  return { messages, loading, downloadFile };
};

export default useGetMessages;
