import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [isConvEmpty, setIsConvEmpty] = useState(false)

  const {authUser} = useAuthContext()

  

  useEffect(() => {

    const getConversations = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/connect/acceptedConnections`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authUser.token}`
              },
              credentials: "include", //This includes cookies and other credentials in the request
            }
          );
          const data = await res.json();
          if(data.length === 0){
            setIsConvEmpty(true)
          }
          if (data.error) {
            throw new Error(data.error);
          }
          setConversations(data);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false)
          
        }
    };

    getConversations();
  }, []);

  return { isConvEmpty, loading, conversations };
};
export default useGetConversations;
