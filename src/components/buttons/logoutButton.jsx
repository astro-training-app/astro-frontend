"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import NavBarLink from "@/components/links/NavBarLink";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <NavBarLink icon={<LogOut />} onClick={handleLogout} variant="secondary">
      Logout
    </NavBarLink>
  );
}
