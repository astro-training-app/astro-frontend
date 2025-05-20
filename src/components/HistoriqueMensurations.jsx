"use client";

import { useEffect, useState } from "react";

export default function HistoriqueMensurations({
  clientId,
  refresh,
  refreshNow,
}) {
  const [mensurations, setMensurations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/mensurations/client/${clientId}`
        );
        let raw = await res.json();

        // 🧠 1. Tri par date ASC
        raw.sort((a, b) => new Date(a.date_mesure) - new Date(b.date_mesure));

        // 🧠 2. Dernières valeurs connues
        let last = {
          poids: null,
          taille: null,
          tour_biceps: null,
          tour_poitrine: null,
          tour_taille: null,
          tour_cuisse: null,
        };

        // 🧠 3. Remplissage des trous
        const complet = raw.map((m) => {
          const full = { ...m };

          for (const key in last) {
            if (m[key] != null && m[key] !== "") {
              last[key] = m[key];
            }
            full[key] = last[key];
          }

          return full;
        });

        setMensurations(complet);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensurations();
  }, [clientId, refresh]);

  if (loading) return <p className="text-center">⏳ Chargement...</p>;

  if (mensurations.length === 0) {
    return <p className="text-center">Aucune mensuration enregistrée.</p>;
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Supprimer cette mensuration ?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/mensurations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur suppression");

      if (typeof refreshNow === "function") refreshNow();
    } catch (err) {
      console.error("Erreur :", err);
      alert("Impossible de supprimer cette mensuration.");
    }
  };

  return (
    <ul className="space-y-4">
      {mensurations.map((m) => (
        <li key={m.id} className="bg-gray-800 p-4 rounded-lg shadow text-white">
          <p>
            <strong>📅 Date :</strong> {m.date_mesure}
          </p>
          <p>
            <strong>⚖️ Poids :</strong> {m.poids} kg
          </p>
          <p>
            <strong>📏 Taille :</strong> {m.taille} cm
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <p>
              <strong>Biceps :</strong> {m.tour_biceps} cm
            </p>
            <p>
              <strong>Poitrine :</strong> {m.tour_poitrine} cm
            </p>
            <p>
              <strong>Taille :</strong> {m.tour_taille} cm
            </p>
            <p>
              <strong>Cuisse :</strong> {m.tour_cuisse} cm
            </p>
            <button
              onClick={() => handleDelete(m.id)}
              className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              🗑️ Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
