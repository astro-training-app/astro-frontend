import RegisterForm from "@/components/register-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Register - FitCoach",
  description: "Create your FitCoach account",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Link href="/" className="flex items-center text-[#2464EA] font-medium hover:underline mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-[#A0A4A8]">Join FitCoach and start your fitness coaching journey</p>
        </div>

        <div className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm">
          <RegisterForm />

          <div className="mt-6 text-center">
            <p className="text-[#A0A4A8]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2464EA] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
