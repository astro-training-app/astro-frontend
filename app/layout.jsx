import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/context/theme-context"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fitness Coaching Platform",
  description: "Connect with fitness coaches or become a coach",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col md:flex-row min-h-screen bg-[#FEFEFE] dark:bg-[#121212] text-[#333333] dark:text-[#E0E0E0]">
              <Sidebar />
              <main className="flex-grow md:ml-72 pt-16 md:pt-0">
                <div className="min-h-[calc(100vh-80px)]">{children}</div>
                <Footer />
              </main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
