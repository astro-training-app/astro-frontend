"use client";

import Link from "next/link";
import LogoutButton from "./logoutButton";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
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
import { useNavBarContext } from "@/contexts/NavBarContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const { isOpen, closeNavBar } = useNavBarContext();
  const navRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Target is:", event.target);
      console.log("Contains ? ", navRef.current?.contains(event.target));
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest("[data-ignore-outside]")
      ) {
        closeNavBar();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeNavBar]);

  return (
    <nav
      className={`
    fixed top-0 left-0 h-[100dvh] w-navbar-mobile
    bg-background z-5
    flex flex-col items-center justify-between 
    shadow-md shadow-black/40 *:w-full
    overflow-y-auto

    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    md:translate-x-0
    md:w-navbar

  `}
      ref={navRef}
    >
      <Link
        href="/"
        className="w-full text-xl text-primary font-bold center-left p-6"
      >
        FitCoach
      </Link>
      {/* Liens */}
      <div className="h-full flex flex-col flex-start text-sm sm:text-base p-4 border-t border-t-gray-500/40 *:h-12 *:mt-2 *:flex *:items-center">
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
      <div className="flex flex-col flex-start text-sm sm:text-base p-4 border-t border-t-gray-500/40 *:h-12 *:mt-2 *:flex *:items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
