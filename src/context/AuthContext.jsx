import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  console.log("🚀 ~ AuthContextProvider ~ authUser:", authUser);
  const isLoggedIn = !!authUser; 

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
