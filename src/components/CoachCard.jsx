"use client";

// j'ai trouver ça en fesant nmp i lucide-react ça donne des icones sympa //

import { User2 } from "lucide-react";

export default function CoachCard({ nom, bio, email }) {
  return (
    <li className="bg-gray-900 border border-gray-700 text-white p-6 rounded-xl shadow-lg flex items-start gap-4 hover:shadow-xl transition">
      {/* Icône à gauche */}
      <div className="bg-green-700 p-3 rounded-full">
        <User2 className="text-white w-6 h-6" />
      </div>

      {/* Contenu coach */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold">{nom}</h3>
        <p className="text-sm text-gray-300 mt-1">{bio}</p>
        <p className="text-xs text-gray-500 italic mt-2">{email}</p>
        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold">
          Contacter
        </button>
      </div>
    </li>
  );
}
