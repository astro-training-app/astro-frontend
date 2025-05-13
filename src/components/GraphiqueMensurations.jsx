"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraphiqueMensurations({ clientId, refresh }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [courbesActives, setCourbesActives] = useState({
    poids: true,
    taille: true,
    tour_biceps: true,
    tour_poitrine: true,
    tour_taille: true,
    tour_cuisse: true,
  });

  const couleurs = {
    poids: "#8884d8",
    taille: "#82ca9d",
    tour_biceps: "#ffc658",
    tour_poitrine: "#ff7f7f",
    tour_taille: "#6fc2f7",
    tour_cuisse: "#aa88ff",
  };

  const nomsAffichés = {
    poids: "Poids (kg)",
    taille: "Taille (cm)",
    tour_biceps: "Biceps (cm)",
    tour_poitrine: "Poitrine (cm)",
    tour_taille: "Tour Taille (cm)",
    tour_cuisse: "Cuisse (cm)",
  };

  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/mensurations/client/${clientId}`
        );
        let raw = await res.json();

        // Tri des données par date
        raw.sort((a, b) => new Date(a.date_mesure) - new Date(b.date_mesure));

        // Valeurs persistantes : on garde la dernière connue si manquante
        let last = {
          poids: null,
          taille: null,
          tour_biceps: null,
          tour_poitrine: null,
          tour_taille: null,
          tour_cuisse: null,
        };

        const complet = raw.map((m) => {
          const line = {
            date: m.date_mesure,
          };

          for (const key in last) {
            if (m[key] != null && m[key] !== "") {
              last[key] = m[key];
            }
            line[key] = last[key];
          }

          return line;
        });

        setData(complet);
      } catch (err) {
        console.error("Erreur chargement graphique :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensurations();
  }, [clientId, refresh]);

  if (loading)
    return (
      <p className="text-white text-center">⏳ Chargement du graphique...</p>
    );
  if (data.length === 0)
    return <p className="text-white text-center">Aucune donnée à afficher.</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4 text-white">
        Évolution des mensurations
      </h3>

      {/* 🟩 Filtres dynamiques */}
      <div className="mb-6 flex flex-wrap gap-4 text-white text-sm">
        {Object.keys(courbesActives).map((key) => (
          <label key={key} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={courbesActives[key]}
              onChange={() =>
                setCourbesActives((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
            {nomsAffichés[key]}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />

          {/* Lignes activées uniquement */}
          {Object.entries(courbesActives).map(
            ([key, active]) =>
              active && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={couleurs[key] || "#ccc"}
                  name={nomsAffichés[key] || key}
                  dot={false}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
