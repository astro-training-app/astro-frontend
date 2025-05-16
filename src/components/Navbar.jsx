"use client";

import Link from "next/link";
import LogoutButton from "./logoutButton";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import NavBarLink from "./links/NavBarLink";
import {
  House,
  UserPlus,
  Handshake,
  Users,
  User,
  LogIn,
  LogOut,
} from "lucide-react";

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
    <nav className="w-96 px-6 py-4 bg-white text-foreground flex gap-5 flex-start flex-col items-center shadow-md justify-between *:w-full">
      {/* Logo */}
      <Link href="/" className="w-full text-xl font-bold center-left">
        FitCoach
      </Link>

      {/* Liens */}
      <div className="h-full flex flex-col flex-start gap-4 text-sm sm:text-base *:h-12 *:flex *:items-center">
        <NavBarLink href="/" icon={<House />}>
          Home
        </NavBarLink>
        {isAuthenticated && (
          <NavBarLink href="/clients" icon={<Users />}>
            Clients
          </NavBarLink>
        )}

        <NavBarLink href="/trouver-coach" icon={<Handshake />}>
          Partners
        </NavBarLink>
        {isAuthenticated && (
          <NavBarLink href="/profil" icon={<User />}>
            Profil
          </NavBarLink>
        )}
        {!isAuthenticated && (
          <NavBarLink href="/login" icon={<LogIn />}>
            Login
          </NavBarLink>
        )}
        {!isAuthenticated && (
          <NavBarLink href="/devenir-coach" icon={<UserPlus />}>
            Sign up
          </NavBarLink>
        )}
        {isAuthenticated && <LogoutButton />}
      </div>
      <button
        onClick={toggleTheme}
        className="ml-4 px-2 py-1 rounded border text-xs sm:text-sm"
      >
        {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
      </button>
    </nav>
  );
}
