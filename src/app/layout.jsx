import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext"; // ✅ déjà importé

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
          <Navbar />
          <main className="p-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
