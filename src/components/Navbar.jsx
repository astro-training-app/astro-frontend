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
        onClick={closeNavBar}
      >
        FitCoach
      </Link>
      {/* Liens */}
      <div className="h-full flex flex-col flex-start text-sm sm:text-base p-4 border-t border-t-gray-500/40 *:h-12 *:mt-2 *:flex *:items-center">
        <NavBarLink href="/" icon={<House />} callback={closeNavBar}>
          Home
        </NavBarLink>
        {isAuthenticated && (
          <NavBarLink href="/clients" icon={<Users />} callback={closeNavBar}>
            Clients
          </NavBarLink>
        )}

        <NavBarLink
          href="/partners"
          icon={<Handshake />}
          callback={closeNavBar}
        >
          Partners
        </NavBarLink>
        {isAuthenticated && (
          <NavBarLink href="/profile" icon={<User />} callback={closeNavBar}>
            Profile
          </NavBarLink>
        )}
        {!isAuthenticated && (
          <NavBarLink href="/login" icon={<LogIn />} callback={closeNavBar}>
            Login
          </NavBarLink>
        )}
        {!isAuthenticated && (
          <NavBarLink
            href="/register"
            icon={<UserPlus />}
            callback={closeNavBar}
          >
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
