"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Protected routes
  const protectedRoutes = ["/clients", "/profile", "/clients/"]

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token")

    if (token) {
      // Fetch user profile from API
      fetchUserProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route))

      if (isProtected) {
        router.push("/login")
      }
    }
  }, [loading, user, pathname, router])

  const fetchUserProfile = async (token) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate an API call

      // Uncomment this for real API integration
      // const response = await fetch(`${API_URL}/auth/profile`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to fetch user profile');
      // }

      // const userData = await response.json();
      // setUser(userData);

      // Simulated API response
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          accountType: "premium",
          role: "pro",
          avatar: "/placeholder.svg?height=200&width=200",
        }
        setUser(mockUser)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      localStorage.removeItem("token")
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate an API call

      // Uncomment this for real API integration
      // const response = await fetch(`${API_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email, password })
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }

      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // setUser(data.user);
      // return data.user;

      // Simulated API response
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate validation
          if (!email || !password) {
            reject(new Error("Email and password are required"))
            return
          }

          if (email === "error@example.com") {
            reject(new Error("Invalid credentials"))
            return
          }

          const mockUser = {
            id: "1",
            name: "John Doe",
            email,
            accountType: "premium",
            role: "pro",
            avatar: "/placeholder.svg?height=200&width=200",
          }

          localStorage.setItem("token", "mock-jwt-token")
          setUser(mockUser)
          resolve(mockUser)
        }, 800)
      })
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate an API call

      // Uncomment this for real API integration
      // const response = await fetch(`${API_URL}/auth/register`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(userData)
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Registration failed');
      // }

      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // setUser(data.user);
      // return data.user;

      // Simulated API response
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate validation
          if (!userData.name || !userData.email || !userData.password) {
            reject(new Error("All fields are required"))
            return
          }

          if (userData.email === "exists@example.com") {
            reject(new Error("Email already in use"))
            return
          }

          const mockUser = {
            id: "1",
            name: userData.name,
            email: userData.email,
            accountType: userData.accountType || "freemium",
            role: userData.role || "amateur",
            avatar: "/placeholder.svg?height=200&width=200",
          }

          localStorage.setItem("token", "mock-jwt-token")
          setUser(mockUser)
          resolve(mockUser)
        }, 800)
      })
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    // In a real app, you might want to call an API endpoint to invalidate the token
    setUser(null)
    localStorage.removeItem("token")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
