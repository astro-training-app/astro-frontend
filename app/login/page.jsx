import LoginForm from "@/components/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Login - FitCoach",
  description: "Log in to your FitCoach account",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Link href="/" className="flex items-center text-[#2464EA] font-medium hover:underline mb-8">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-[#A0A4A8]">Log in to your FitCoach account</p>
        </div>

        <div className="bg-white dark:bg-[#121212] p-8 rounded-lg shadow-sm">
          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-[#A0A4A8]">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#2464EA] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
