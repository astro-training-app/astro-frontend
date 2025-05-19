import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Providers } from "./providers";
import Content from "./content";

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
            <Content> {children}</Content>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
