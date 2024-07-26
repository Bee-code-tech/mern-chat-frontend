import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const useGetConnections = () => {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const {authUser} = useAuthContext()

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/connect/connections`,
         {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);
  return {loading, connections}
}

export default useGetConnections;
