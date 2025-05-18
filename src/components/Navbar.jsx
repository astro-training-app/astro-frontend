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
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-96  flex flex-start flex-col items-center shadow-md justify-between *:w-full">
      <Link
        href="/"
        className="w-full text-xl text-primary font-bold center-left p-6"
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
        <ThemeToggle />
      </div>
    </nav>
  );
}
