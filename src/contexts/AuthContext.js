"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
    if (isAuthenticated) {
      toast.success("Vous etes connecté");
    }
  }, [isAuthenticated]);

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/"); // j'ai rajouter ici le chemin en cas de deconnection //
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
