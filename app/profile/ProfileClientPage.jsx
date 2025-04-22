"use client"
import { useAuth } from "@/context/auth-context"
import ProfileForm from "@/components/profile-form"
import { Loader } from "lucide-react"

export default function ProfileClientPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader size={32} className="animate-spin text-[#2464EA]" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {user ? (
          <ProfileForm user={user} />
        ) : (
          <div className="bg-[#F3F4F6] dark:bg-[#1E1E1E] p-8 rounded-lg text-center">
            <p className="text-[#A0A4A8] mb-4">Please log in to view your profile</p>
          </div>
        )}
      </div>
    </div>
  )
}
