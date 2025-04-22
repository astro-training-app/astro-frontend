"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Home,
  Users,
  PenToolIcon as Tools,
  Handshake,
  User,
  LogIn,
  UserPlus,
  ChevronRight,
} from "lucide-react"

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  const isActive = (path) => {
    if (path === "/" && pathname !== "/") {
      return false
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    ...(user
      ? [
          { path: "/clients", label: "Clients", icon: <Users size={20} /> },
          { path: "/tools", label: "Tools", icon: <Tools size={20} /> },
          { path: "/partners", label: "Partners", icon: <Handshake size={20} /> },
          { path: "/profile", label: "Profile", icon: <User size={20} /> },
        ]
      : [
          { path: "/tools", label: "Tools", icon: <Tools size={20} /> },
          { path: "/partners", label: "Partners", icon: <Handshake size={20} /> },
          { path: "/login", label: "Login", icon: <LogIn size={20} /> },
          { path: "/register", label: "Sign Up", icon: <UserPlus size={20} /> },
        ]),
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white dark:bg-[#121212] shadow-md md:hidden"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-full bg-white dark:bg-[#121212] shadow-lg transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-64 md:w-72`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#2464EA]">FitCoach</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-[#2464EA]/10 text-[#2464EA]"
                        : "hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    {isActive(item.path) && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <button
                    onClick={logout}
                    className="w-full flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* User Profile & Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="flex items-center mb-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={user.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm text-[#A0A4A8] truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-[#A0A4A8] text-sm">Not logged in</p>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="flex items-center">
                {theme === "dark" ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
