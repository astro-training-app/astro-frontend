"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function Profil() {
  const { isAuthenticated } = useAuth();
  const checking = useProtectedRoute();
  const router = useRouter();

  if (checking)
    return (
      <p className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white p-10 rounded-lg">
        Chargement...
      </p>
    );

  if (!isAuthenticated) {
    return (
      <p className="bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400 p-10 rounded-lg">
        Accès refusé. Veuillez vous connecter pour accéder à cette page.
      </p>
    );
  }

  return (
    <main className="min-h-screen p-10 text-gray-800 dark:text-white">
      <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
        <p className="text-green-600 dark:text-green-400">
          Vous êtes connecté !
        </p>
        <p>
          <strong>Nom :</strong> Arthur Coach
        </p>
        <p>
          <strong>Email :</strong> arthur@astro.app
        </p>
        <p>
          <strong>Rôle :</strong> Coach
        </p>
        <p>
          <strong>Objectif :</strong> Aider mes clients à briller ! 💫
        </p>
        {/* 🧩 Boutons d'action */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/ajouter-client")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ➕ Ajouter un client
          </button>
          <button
            onClick={() => router.push("/clients")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            👥 Voir mes clients
          </button>
        </div>
      </div>
    </main>
  );
}
