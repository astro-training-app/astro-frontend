"use client";

import { User2, ExternalLink } from "lucide-react";

export default function CoachCard({
  nom = "Nom inconnu",
  email = "Email inconnu",
}) {
  return (
    <div className="max-w-md w-full bg-background border border-subtitle text-secondary p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-xl transition text-center sm:text-left">
      {/* Icône centrée */}
      <div className="bg-primary p-5 rounded-full">
        <User2 className="text-white w-8 h-8" />
      </div>

      {/* Contenu coach */}
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold">{nom}</h3>
        <p className="text-base sm:text-lg italic mt-2">{email}</p>
        <a
          href="https://http.cat/404"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-[var(--primary)] hover:underline text-lg font-semibold"
        >
          Voir le profil{" "}
          <ExternalLink className="inline w-5 h-5 ml-2 text-[var(--primary)]" />
        </a>
      </div>
    </div>
  );
}
