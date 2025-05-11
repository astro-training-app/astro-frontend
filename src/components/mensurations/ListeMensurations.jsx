"use client";

import { useEffect, useState } from "react";

const url = "http://localhost:3000/api/mensurations";

export default function ListeMensurations() {
  const [mensuration, setMensuration] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url); // Effectue une requête GET par défaut
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await res.json();
        setMensuration(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="grid gap-6">
      {mensuration.map((item) => (
        <div
          key={item.id}
          className="bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600"
        >
          <p className="text-lg font-semibold mb-2">📅 {item.date_mesure}</p>
          <p>⚖️ Poids : {item.poids} kg</p>
          <p>📏 Taille : {item.taille} cm</p>
          <p>💪 Biceps : {item.tour_biceps} cm</p>
          <p>🧍 Poitrine : {item.tour_poitrine} cm</p>
          <p>🧍‍♂️ Taille : {item.tour_taille} cm</p>
          <p>🦵 Cuisse : {item.tour_cuisse} cm</p>
        </div>
      ))}
    </div>
  );
}
