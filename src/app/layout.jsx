import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import SessionPrompt from "@/components/SessionPrompt";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitCoach",
  description: "Application de coaching sportif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>
          <AuthProvider>
            <div className="h-screen flex flex-row justify-between">
              <Navbar />
              <div className="flex flex-col h-full w-full">
                <main className="p-4 w-full">{children}</main>
                <ToastContainer position="top-center" autoClose={3000} />
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
