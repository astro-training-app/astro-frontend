// hooks/useProtectedRoute.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useProtectedRoute() {
  const router = useRouter();
  const [checking, setChecking] = useState(true); // ✅ nouveau

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/login");
    } else {
      setChecking(false); // ✅ autorisé à afficher la page
    }
  }, [router]);

  return checking; // retourne true tant qu’on vérifie
}
