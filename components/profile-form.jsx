"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Save, Edit2, Loader } from "lucide-react"

export default function ProfileForm({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: "Certified personal trainer with 5+ years of experience specializing in strength training and weight management.",
    specialties: "Strength Training, Weight Loss, Nutrition",
    location: "New York, NY",
    phone: "(555) 123-4567",
    website: "https://example.com",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate saving to API
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setIsEditing(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="bg-white dark:bg-[#121212] rounded-lg shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white dark:border-[#121212]">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            </div>
            <button
              className="absolute bottom-0 right-0 bg-[#2464EA] text-white p-2 rounded-full hover:bg-[#1A58C2] transition-colors"
              aria-label="Change profile picture"
            >
              <Camera size={18} />
            </button>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-2xl font-bold mr-3">{user.name}</h2>
              <span className="bg-[#2464EA]/10 text-[#2464EA] text-sm font-medium px-3 py-1 rounded-full">
                {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
              </span>
            </div>
            <p className="text-[#A0A4A8] mb-4">{user.email}</p>
            <div className="flex items-center">
              <span className="bg-[#EA6424]/10 text-[#EA6424] text-sm font-medium px-3 py-1 rounded-full">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Coach
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-transition ml-auto mt-6 md:mt-0 flex items-center bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 text-[#333333] dark:text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1E1E1E]"
          >
            <Edit2 size={18} className="mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="p-8">
        {saveSuccess && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="website">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="specialties">
              Specialties
            </label>
            <input
              type="text"
              id="specialties"
              name="specialties"
              value={formData.specialties}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[#2464EA] disabled:bg-gray-50 dark:disabled:bg-[#1E1E1E] disabled:text-gray-500 dark:disabled:text-gray-400"
          />
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-transition flex items-center bg-[#2464EA] hover:bg-[#1A58C2] text-white font-medium py-2 px-6 rounded-lg disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
