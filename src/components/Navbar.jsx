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
  Sun,
  Moon,
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
    <nav className="w-96 bg-white text-foreground flex flex-start flex-col items-center shadow-md justify-between *:w-full">
      {/* Logo */}
      <Link
        href="/"
        className="w-full text-xl text-blue-600 font-bold center-left p-6"
      >
        FitCoach
      </Link>

      {/* Liens */}
      <div className="h-full flex flex-col flex-start text-sm sm:text-base p-4 border-t border-t-gray-200 *:h-12 *:mt-2 *:flex *:items-center">
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
      <div className="flex flex-col flex-start text-sm sm:text-base p-4 border-t border-t-gray-200 *:h-12 *:mt-2 *:flex *:items-center">
        <NavBarLink
          onClick={toggleTheme}
          className="ml-4 px-2 py-1 rounded border text-xs sm:text-sm"
          icon={theme === "light" ? <Sun /> : <Moon />}
        >
          {theme === "light" ? "Dark" : "Light"} Mode
        </NavBarLink>
      </div>
    </nav>
  );
}
