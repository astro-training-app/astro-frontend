"use client";

import Link from "next/link";
import Cookies from "js-cookie";

export default function ClientCard({ client, onDelete }) {
  const { prenom, nom, email, age, sexe, objectif, created_at, photo } = client;

  const sexeLabel = sexe === "H" ? "Homme" : sexe === "F" ? "Femme" : "Autre";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 w-full max-w-md">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-white">
          {photo ? (
            <img
              src={photo}
              alt={`${prenom} ${nom}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            `${prenom[0]}${nom[0]}`
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {prenom} {nom}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-200">
        <p>
          <span className="font-medium">Âge :</span> {age} ans
        </p>
        <p>
          <span className="font-medium">Sexe :</span> {sexeLabel}
        </p>
        <p>
          <span className="font-medium">Objectif :</span> {objectif}
        </p>
        <p>
          <span className="font-medium">Inscrit le :</span>{" "}
          {new Date(created_at).toLocaleDateString()}
        </p>
        <button
          onClick={() => onDelete(client.id)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
        >
          Supprimer
        </button>
        <Link href={`/mock-client/${client.id}`}>
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full">
            🧪 Page test mensurations
          </button>
        </Link>
      </div>
    </div>
  );
}
