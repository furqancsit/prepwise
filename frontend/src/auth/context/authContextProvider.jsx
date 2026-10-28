import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const response = await axios.get("/api/v1/auth/me", {
        withCredentials: true,
      });

      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // Check authentication when app starts
  useEffect(() => {
    getMe();
  }, []);

  const value = {
    user,
    loading,
    getMe,
    setUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
