"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import NavBarLink from "./links/NavBarLink";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // supprime le token
    router.push("/"); // redirige vers l’accueil immédiatement
  };

  return (
    <NavBarLink icon={<LogOut />} onClick={handleLogout} variant="secondary">
      Logout
    </NavBarLink>
  );
}
