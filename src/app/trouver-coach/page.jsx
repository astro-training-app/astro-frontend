"use client";

import CoachCard from "@/components/CoachCard";
import { useState } from "react";
import useProtectedRoute from "@/hooks/useProtectedRoute"; // le chemin pour authentification //
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

export default function TrouverCoach() {
  const [search, setSearch] = useState("");
  // const checking = useProtectedRoute();

  // if (checking) return <p className="text-white p-10">Chargement...</p>; // bon la cela doit pas se voir en fait //

  const coachs = [
    {
      id: 1,
      nom: "Jean Dupont",
      email: "jean.dupont@fitcoach.com",
      bio: "Coach certifié, spécialisé en musculation.",
    },
    {
      id: 2,
      nom: "Claire Martin",
      email: "claire.martin@fitcoach.com",
      bio: "Coach forme et bien-être, yoga et pilates.",
    },
    {
      id: 3,
      nom: "Ahmed Ben",
      email: "ahmed.ben@fitcoach.com",
      bio: "Coach sportif à domicile, nutrition et cardio.",
    },
  ];

  return (
    <MotionLayoutWrapper>
      <div className="max-w-3xl mx-auto mt-10 p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Trouver un coach
        </h2>

        {/* Champ de recherche */}
        <div className="mb-6">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-white mb-1"
          >
            Rechercher un coach :
          </label>
          <input
            type="text"
            id="search"
            placeholder="Nom, spécialité..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-4 py-2 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Liste des coachs */}
        <ul className="space-y-6">
          {coachs
            .filter(
              (item) =>
                item.nom.toLowerCase().includes(search.toLowerCase()) ||
                item.bio.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <CoachCard
                key={item.id}
                nom={item.nom}
                bio={item.bio}
                email={item.email}
              />
            ))}
        </ul>
      </div>
    </MotionLayoutWrapper>
  );
}
