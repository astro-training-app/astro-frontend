"use client";

import { useEffect, useState } from "react";

export default function DerniereMensuration({ clientId, refresh }) {
  const [last, setLast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLast = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/mensurations/client/${clientId}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setLast(data[data.length - 1]); // dernière entrée
        }
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLast();
  }, [clientId, refresh]); // 👈 refresh ajouté ici

  // 🚩 tous les "return" sont ici dans le bon bloc (pas dans useEffect !)
  if (loading) {
    return (
      <p className="text-center text-white">
        ⏳ Chargement dernière mensuration...
      </p>
    );
  }

  if (!last) {
    return (
      <p className="text-center text-white">Aucune mensuration enregistrée.</p>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white shadow">
      <h3 className="text-xl font-bold mb-2">Dernière mensuration</h3>
      <p>
        <strong>📅 Date :</strong> {last.date_mesure}
      </p>
      <p>
        <strong>⚖️ Poids :</strong> {last.poids} kg
      </p>
      <p>
        <strong>📏 Taille :</strong> {last.taille} cm
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <p>
          <strong>Biceps :</strong> {last.tour_biceps} cm
        </p>
        <p>
          <strong>Poitrine :</strong> {last.tour_poitrine} cm
        </p>
        <p>
          <strong>Taille :</strong> {last.tour_taille} cm
        </p>
        <p>
          <strong>Cuisse :</strong> {last.tour_cuisse} cm
        </p>
      </div>
    </div>
  );
}
