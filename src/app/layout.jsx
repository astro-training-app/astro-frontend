import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Providers } from "./providers";
import Content from "./content";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitCoach",
  description: "Application de coaching sportif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Toaster
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#1f2937", // gray-800
              border: "1px solid #e5e7eb", // gray-200
              padding: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            },
            success: {
              iconTheme: {
                primary: "#3B82F6",
                secondary: "#Dbeafe",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FEE2E2",
              },
            },
          }}
        />
        <Providers>
          <AuthProvider>
            <Content> {children}</Content>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
