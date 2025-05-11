"use client";

import Link from "next/link";
import LogoutButton from "./logoutButton";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full px-6 py-4 bg-background text-foreground flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🦾 FitCoach
      </Link>

      {/* Liens */}
      <div className="flex gap-4 text-sm sm:text-base">
        {isAuthenticated && (
          <>
            <Link href="/profil" className="hover:underline">
              Mon Profil
            </Link>
            <Link href="/clients" className="hover:underline">
              Mes Clients
            </Link>
            <Link href="/page-animation" className="hover:underline">
              Page animée ✨
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link href="/devenir-coach" className="hover:underline">
            Devenir coach
          </Link>
        )}
        <Link href="/trouver-coach" className="hover:underline">
          Trouver coach
        </Link>
        {!isAuthenticated && (
          <Link href="/login" className="hover:underline">
            S'identifier
          </Link>
        )}
        {isAuthenticated && <LogoutButton />}
        <button
          onClick={toggleTheme}
          className="ml-4 px-2 py-1 rounded border text-xs sm:text-sm"
        >
          {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
        </button>
      </div>
    </nav>
  );
}
