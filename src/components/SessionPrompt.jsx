"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function SessionPrompt() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false); // vrai affichage JSX
  const [slideIn, setSlideIn] = useState(false); // animation visible

  useEffect(() => {
    if (isAuthenticated) {
      setMounted(true); // on monte le composant (on le voit en JSX)
      setTimeout(() => {
        setSlideIn(true); // on démarre le slide (petit délai pour l'effet)
      }, 50);

      const timer = setTimeout(() => {
        setSlideIn(false); // on commence à le faire glisser
        setTimeout(() => setMounted(false), 500); // après l'animation, on l'enlève du DOM
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setMounted(false);
      setSlideIn(false);
    }
  }, [isAuthenticated]);

  if (!mounted) return null; // on ne le rend pas si pas monté

  return (
    <div
      className={`fixed top-6 left-0 z-50 px-6 py-4 rounded-r-lg shadow-lg 
        transform transition-all duration-500 ease-out
        ${slideIn ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        bg-green-600 text-white`}
    >
      🫡 Vous êtes connecté à Astro Training
    </div>
  );
}
