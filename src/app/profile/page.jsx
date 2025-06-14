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
            credentials: "include", // Include cookies for authentication
          });
          if (!response.ok) {
            throw new Error("Error while fetching coaches");
          }
          const responseData = await response.json();

          // Vérifie si data est bien un tableau
          if (Array.isArray(responseData.data)) {
            setCoaches(responseData.data);
          } else {
            throw new Error("Coach data is not in array format.");
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
      <p className="bg-gray-200 text-gray-800 p-10 rounded-lg">Loading...</p>
    );
  }

  if (!isAuthenticated) {
    return (
      <p className="bg-red-100 text-red-600 p-10 rounded-lg">
        Access denied. Please log in to access this page.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="bg-gray-200 text-gray-800 p-10 rounded-lg">
        Loading data...
      </p>
    );
  }

  if (error) {
    return (
      <p className="bg-red-100 text-red-600 p-10 rounded-lg">
        An error occurred : {error}
      </p>
    );
  }

  return (
    <main className="">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>

        {/* Displaying the fetched coaches */}
        <div className="mt-6">
          {coaches.length > 0 ? (
            <div className="space-y-4">
              {coaches.map((coach) => (
                <div key={coach.id} className="space-y-10">
                  <h3 className="text-2xl font-semibold">{coach.nom}</h3>
                  {/* Afficher l'image du coach, si disponible */}
                  <div className="flex gap-10">
                    {coach.image ? (
                      <img
                        src={coach.image}
                        alt={coach.nom}
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white">Missing image</span>
                      </div>
                    )}
                    <div className="h-fit *:flex self-center *:justify-between *:text-secondary w-1/2">
                      <p className="">
                        Email:{" "}
                        <span>
                          <b>{coach.email}</b>
                        </span>
                      </p>
                      <p>
                        Role:{" "}
                        <span>
                          <b>{coach.role}</b>
                        </span>
                      </p>
                      <p>
                        Account type:{" "}
                        <span>
                          <b>{coach.type_compte}</b>
                        </span>
                      </p>
                      <p>
                        Created at:{" "}
                        <span>
                          <b>
                            {new Date(coach.created_at).toLocaleDateString()}
                          </b>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="">No coach available.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/add-client")}
            className="bg-primary hover:bg-button-hover-bg transition text-white px-4 py-2 rounded"
          >
            Add client
          </button>
          <button
            onClick={() => router.push("/clients")}
            className=" text-primary px-4 py-2 rounded border border-primary"
          >
            View clients
          </button>
        </div>
      </div>
    </main>
  );
}
