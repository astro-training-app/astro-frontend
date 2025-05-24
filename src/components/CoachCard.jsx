"use client";

import { User2, ExternalLink } from "lucide-react";


export default function CoachCard({ nom, bio, email }) {
  return (
    <li
      className="bg-[var(--background)] border border-gray-400 text-[var(--secondary)]
      p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start
      gap-4 hover:shadow-xl transition text-center sm:text-left"
    >
      {/* Icône centrée */}
      <div className="bg-green-700 p-3 rounded-full">
        <User2 className="text-white w-6 h-6" />
      </div>

      {/* Contenu coach */}
      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold">{nom}</h3>
        <p className="text-sm mt-1">{bio}</p>
        <p className="text-xs italic mt-2">{email}</p>
        <a
          href="https://http.cat/404"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[var(--primary)] hover:underline text-sm font-semibold"
        >
          Voir le profil{" "}
          <ExternalLink className="inline w-4 h-4 ml-1 text-[var(--primary)]" />
        </a>
      </div>
    </li>
  );
}
