import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // const sendMessage = async (message) => {
  // 	setLoading(true);
  // 	try {

  // 		// file code
  // 		const formData = new FormData();
  //         formData.append("message", message);
  //         if (file) {
  //             formData.append("file", file);
  //         }
  // 		// end file code

  // 		const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
  // 			method: "POST",
  //             body: formData,
  // 			// headers: {
  // 			// 	"Content-Type": "application/json",

  // 			// },
  // 			// body: JSON.stringify({ message, formData }),
  // 		});
  // 		const data = await res.json();
  // 		if (data.error) throw new Error(data.error);

  // 		setMessages([...messages, data]);
  // 	} catch (error) {
  // 		toast.error(error.message);
  // 	} finally {
  // 		setLoading(false);
  // 	}
  // };

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
