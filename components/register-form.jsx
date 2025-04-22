"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Eye, EyeOff, Loader } from "lucide-react"

export default function RegisterForm() {
  const router = useRouter()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "freemium",
    role: "amateur",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registerError, setRegisterError] = useState("")

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

    // Clear register error when any field changes
    if (registerError) {
      setRegisterError("")
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)
      setRegisterError("")

      try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...userData } = formData

        await register(userData)
        router.push("/profile")
      } catch (error) {
        setRegisterError(error.message || "Registration failed. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {registerError && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
          {registerError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-3 border ${
            errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

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

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
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

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full p-3 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Account Type</label>
        <div className="flex">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, accountType: "freemium" })}
            className={`flex-1 py-2 px-4 text-center ${
              formData.accountType === "freemium"
                ? "bg-[#2464EA] text-white"
                : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
            } rounded-l-lg transition-colors`}
          >
            Freemium
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, accountType: "premium" })}
            className={`flex-1 py-2 px-4 text-center ${
              formData.accountType === "premium"
                ? "bg-[#2464EA] text-white"
                : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
            } rounded-r-lg transition-colors`}
          >
            Premium
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Coach Level</label>
        <div className="flex">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "amateur" })}
            className={`flex-1 py-2 px-4 text-center ${
              formData.role === "amateur" ? "bg-[#2464EA] text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
            } rounded-l-lg transition-colors`}
          >
            Amateur
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "pro" })}
            className={`flex-1 py-2 px-4 text-center ${
              formData.role === "pro" ? "bg-[#2464EA] text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-[#A0A4A8]"
            } rounded-r-lg transition-colors`}
          >
            Professional
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-transition w-full bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-3 px-6 rounded-lg disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            Creating account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  )
}
