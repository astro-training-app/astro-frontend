"use client";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BurgerBtn from "@/components/mensurations/buttons/BurgerBtn";

import React from "react";

function Content({ children }) {
  return (
    <div className="relative h-screen flex flex-row justify-between">
      <BurgerBtn className="fixed top-4 left-4" />
      <Navbar />
      <div className=" md:ml-navbar flex flex-col h-full w-full">
        <main className="p-4 w-full">{children}</main>
        <ToastContainer position="top-center" autoClose={3000} />
        <Footer />
      </div>
    </div>
  );
}

export default Content;
