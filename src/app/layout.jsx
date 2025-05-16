import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import SessionPrompt from "@/components/SessionPrompt";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  titre: "FitCoach",
  description: "Application de coaching sportif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-background text-foreground`}>
        <AuthProvider>
          <div className="h-screen flex flex-row justify-between">
            <Navbar />
            <div className="flex flex-col h-full w-full">
              <SessionPrompt />

              <main className="p-4 w-full">{children}</main>
              <ToastContainer position="top-center" autoClose={3000} />
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
