"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Menu, X, Sun, Moon, LogOut } from "lucide-react"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[#2464EA]">
            FitCoach
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#2464EA] transition-colors">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/clients" className="hover:text-[#2464EA] transition-colors">
                  Clients
                </Link>
                <Link href="/tools" className="hover:text-[#2464EA] transition-colors">
                  Tools
                </Link>
                <Link href="/partners" className="hover:text-[#2464EA] transition-colors">
                  Partners
                </Link>
                <Link href="/profile" className="hover:text-[#2464EA] transition-colors">
                  Profile
                </Link>
                <button onClick={logout} className="hover:text-[#2464EA] transition-colors flex items-center">
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/tools" className="hover:text-[#2464EA] transition-colors">
                  Tools
                </Link>
                <Link href="/partners" className="hover:text-[#2464EA] transition-colors">
                  Partners
                </Link>
                <Link href="/login" className="hover:text-[#2464EA] transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#2464EA] hover:bg-[#1A58C2] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#1E1E1E] transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#1E1E1E] transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#1E1E1E] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#121212] shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="py-2 hover:text-[#2464EA] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            {user ? (
              <>
                <Link
                  href="/clients"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  href="/tools"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link
                  href="/partners"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partners
                </Link>
                <Link
                  href="/profile"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="py-2 text-left hover:text-[#2464EA] transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/tools"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tools
                </Link>
                <Link
                  href="/partners"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partners
                </Link>
                <Link
                  href="/login"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="py-2 hover:text-[#2464EA] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
