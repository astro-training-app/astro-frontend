"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const checking = useProtectedRoute();
  const router = useRouter();

  // State to store the coaches' data
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCoaches = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:3000/api/coaches", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des coaches");
          }
          const responseData = await response.json();

          // Vérifie si data est bien un tableau
          if (Array.isArray(responseData.data)) {
            setCoaches(responseData.data);
          } else {
            throw new Error(
              "Les données des coaches ne sont pas sous forme de tableau."
            );
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCoaches();
    }
  }, [isAuthenticated]);

  if (checking) {
    return (
      <p className="bg-gray-200 text-gray-800 p-10 rounded-lg">Chargement...</p>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="bg-red-100 text-red-600 p-10 rounded-lg">
        Accès refusé. Veuillez vous connecter pour accéder à cette page.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="bg-gray-200 text-gray-800 p-10 rounded-lg">
        Chargement des données...
      </p>
    );
  }

  if (error) {
    return (
      <p className="bg-red-100 text-red-600 p-10 rounded-lg">
        Une erreur est survenue : {error}
      </p>
    );
  }

  return (
    <main className="min-h-screen p-10 text-gray-800">
      <div className="bg-gray-200 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Mon Profil</h1>
        <p className="text-green-600">Vous êtes connecté !</p>

        {/* Displaying the fetched coaches */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Mes Coaches :</h2>

          {coaches.length > 0 ? (
            <div className="space-y-4">
              {coaches.map((coach) => (
                <div key={coach.id} className="border p-4 rounded-lg">
                  <h3 className="text-2xl font-semibold">{coach.nom}</h3>
                  {/* Afficher l'image du coach, si disponible */}
                  {coach.image ? (
                    <img
                      src={coach.image}
                      alt={coach.nom}
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-white">Pas d'image</span>
                    </div>
                  )}
                  <p>Email: {coach.email}</p>
                  <p>Rôle: {coach.role}</p>
                  <p>Type de compte: {coach.type_compte}</p>
                  <p>
                    Inscrit le:{" "}
                    {new Date(coach.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucun coach disponible.</p>
          )}
        </div>

        {/* Action Buttons */}
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
