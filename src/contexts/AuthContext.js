"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const refreshAuth = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const ME_ENDPOINT = process.env.NEXT_PUBLIC_ME_ENDPOINT;
    const ME_URL = `${API_URL}${ME_ENDPOINT}`;

    try {
      const response = await fetch(ME_URL, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Not authenticated");

      const data = await response.json();

      if (data && data.data && data.data.user) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const logout = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const LOGOUT_ENDPOINT = process.env.NEXT_PUBLIC_LOGOUT_ENDPOINT;
    const LOGOUT_URL = `${API_URL}${LOGOUT_ENDPOINT}`;

    try {
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");

      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logout successful");
      router.push("/");
    } catch (err) {
      toast.error("Error during logout.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
