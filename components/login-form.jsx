"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { Eye, EyeOff, Loader } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }

    // Clear login error when any field changes
    if (loginError) {
      setLoginError("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      setLoginError("")

      try {
        await login(formData.email, formData.password)
        router.push("/profile")
      } catch (error) {
        setLoginError(error.message || "Invalid email or password. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {loginError && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
          {loginError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-3 border ${
            errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm text-[#2464EA] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"
            } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0A4A8]"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-transition w-full bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            Logging in...
          </span>
        ) : (
          "Log In"
        )}
      </button>
    </form>
  )
}
