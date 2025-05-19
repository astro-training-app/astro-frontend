"use client";

import React from "react";
import { createContext, useContext, useState } from "react";

// Context
// This context will be used to manage the state of the navigation bar
const NavBarContext = createContext();

// Provider
// This component provides the NavBarContext to its children
export function NavBarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavBar = () => {
    setIsOpen((prev) => !prev);
  };
  const closeNavBar = () => {
    setIsOpen(false);
  };
  const openNavBar = () => {
    setIsOpen(true);
  };
  return (
    <NavBarContext.Provider
      value={{ isOpen, toggleNavBar, closeNavBar, openNavBar }}
    >
      {children}
    </NavBarContext.Provider>
  );
}

// Hook
// This hook allows you to use the NavBarContext in your components
export function useNavBarContext() {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("useNavBarContext must be used within a NavBarProvider");
  }
  return context;
}
