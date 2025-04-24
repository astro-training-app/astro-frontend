import Link from "next/link";
import "./globals.css";

export const metadata = {
  titre: "FitCoach",
  description: "Application de coaching spaortif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {/* barre de navigation */}
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🦾 FitCoach</h1>
          <div className="flex gap-4">
            <Link href="/" className="text-blue-600 hover:underline">
              Accueil
            </Link>
            <Link
              href="/devenir-coach"
              className="text-blue-600 hover:underline"
            >
              Devenir coach
            </Link>
            <Link
              href="/trouver-coach"
              className="text-blue-600 hover:underline"
            >
              Trouver un coach
            </Link>
            <Link href="/login" className="text-blue-600 hover:underline">
              Se logger
            </Link>
          </div>
        </nav>

        {/* contenu des pages */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
