import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  console.log("🚀 ~ AuthContextProvider ~ authUser:", authUser);
  const isLoggedIn = !!authUser; // Check if authUser exists

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
