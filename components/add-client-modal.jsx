"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AddClientModal({ onClose, onAddClient }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    objective: "Weight Loss",
    startDate: new Date().toISOString().split("T")[0],
  })

  const [errors, setErrors] = useState({})

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
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      if (birthDate > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future"
      }
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onAddClient(formData)
    }
  }

  const objectives = ["Weight Loss", "Muscle Gain", "General Fitness", "Sports Performance", "Flexibility"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#121212] rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Add New Client</h2>
          <button
            onClick={onClose}
            className="text-[#A0A4A8] hover:text-[#333333] dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
              />
              {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="objective">
                Objective
              </label>
              <select
                id="objective"
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]"
              >
                {objectives.map((objective) => (
                  <option key={objective} value={objective}>
                    {objective}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.startDate ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                } rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA]`}
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-transition bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium px-4 py-2 rounded-lg"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
