"use client";

import link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // on applique le theme au body //
    document.documentElement.classname = theme;
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full px-6 bg-background text-foreground flex items-center justify-between shadow-md">
      {/* Logo */}
      <link href="/" className="text-xl font-bold">
        {" "}
        🦾 FitCoach{" "}
      </link>
      {/* Lien */}
      <div className="flex gap-4 text-sm sm:text-base">
        <Link href="/devenir-coach" className="hover:underline">
          Devenir coach
        </Link>
        <Link href="/trouver-coach" className="hover:underline">
          trouver coach
        </Link>
        <Link href="/login" className="hover:underline">
          S'identifier
        </Link>
        <button
          onClick={toggleTheme}
          className="ml-4 px-2 py-1 rounded text-xs sm:text-sm"
        >
          {theme === "light" ? "🌛Sombre" : "☀️ Clair"}
        </button>
      </div>
    </nav>
  );
}
