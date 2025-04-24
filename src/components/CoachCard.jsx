"use client";

// ici on crée un composant card pour les coachs avec des props qui seront mis en relations dans trouver-coach //
export default function CoachCard({ nom, bio, email }) {
  return (
    <li className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold text-gray-800">{nom}</h3>
      <p className="text-gray-600">{bio}</p>
      <p className="text-sm text-gray-500 italic">{email}</p>
      <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Contacter
      </button>
    </li>
  );
}

