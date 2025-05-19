"use client";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BurgerBtn from "@/components/mensurations/buttons/BurgerBtn";
import { useNavBarContext } from "@/contexts/NavBarContext";

import React, { useEffect } from "react";

function Content({ children }) {
  const { isOpen, closeNavbar } = useNavBarContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div className="relative h-screen flex flex-row justify-between">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-1 md:hidden transition-opacity duration-300"
          onClick={closeNavbar}
        />
      )}

      <BurgerBtn className="fixed  top-4 left-4" />
      <Navbar />

      <div className="md:ml-navbar flex flex-col h-full w-full overflow-y-auto">
        <main className="p-4 w-full">{children}</main>
        <ToastContainer position="top-center" autoClose={3000} />
        <Footer />
      </div>
    </div>
  );
}

export default Content;
