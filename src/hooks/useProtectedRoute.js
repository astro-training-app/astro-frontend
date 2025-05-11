"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function useProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirige si pas connecté
    }
  }, [isAuthenticated, router]); // On ajoute router ici

  return !isAuthenticated;
}
  