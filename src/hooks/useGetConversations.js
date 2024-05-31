import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isConvEmpty, setIsConvEmpty] = useState(false)

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`,
          {
            method: "GET",
            credentials: "include", // This includes cookies and other credentials in the request
          }
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setTimeout(() => setLoading(false), 1500)
        if(data.lenght === 0){
          setIsConvEmpty(true)
        }
      }
    };

    getConversations();
  }, []);

  return { isConvEmpty, loading, conversations };
};
export default useGetConversations;
