"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // supprime le token
    router.push("/"); // redirige vers l’accueil immédiatement
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
    >
      Se déconnecter 🔓
    </button>
  );
}
