"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // le vrai token est déjà là
    setIsAuthenticated(!!token); // on check juste s’il existe
  }, []);

  const login = () => {
    // facultatif, tu peux le virer si login() est déjà géré dans /login
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
