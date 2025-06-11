"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function SessionPrompt() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false); // allows component rendering
  const [slideIn, setSlideIn] = useState(false); // controls animation visibility

  useEffect(() => {
    if (isAuthenticated) {
      setMounted(true); // render component in the DOM
      setTimeout(() => {
        setSlideIn(true); // trigger slide-in effect after a short delay
      }, 50);

      const timer = setTimeout(() => {
        setSlideIn(false); // start slide-out
        setTimeout(() => setMounted(false), 500); // remove from DOM after animation
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setMounted(false);
      setSlideIn(false);
    }
  }, [isAuthenticated]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed top-6 left-0 z-50 px-6 py-4 rounded-r-lg shadow-lg 
        transform transition-all duration-500 ease-out
        ${slideIn ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        bg-green-600 text-white`}
    >
      🫡 You are logged in to Astro Training
    </div>
  );
}
