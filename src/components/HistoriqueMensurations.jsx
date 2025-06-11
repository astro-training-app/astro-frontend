"use client";

import { useEffect, useState } from "react";

export default function MeasurementsHistory({ clientId, refresh, refreshNow }) {
  const [mensurations, setMensurations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/mensurations/client/${clientId}`
        );
        let raw = await res.json();

        // Sort by date (ascending)
        raw.sort((a, b) => new Date(a.date_mesure) - new Date(b.date_mesure));

        // Fill gaps using last known values
        let last = {
          poids: null,
          taille: null,
          tour_biceps: null,
          tour_poitrine: null,
          tour_taille: null,
          tour_cuisse: null,
        };

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
        console.error("Error from loading:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensurations();
  }, [clientId, refresh]);

  if (loading) return <p className="text-center">⏳ Loading...</p>;

  if (mensurations.length === 0) {
    return <p className="text-center">No measurements found.</p>;
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this measurement?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/mensurations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error deleting");

      if (typeof refreshNow === "function") refreshNow();
    } catch (err) {
      console.error("Error:", err);
      alert("Unable to delete this measurement.");
    }
  };

  return (
    <ul className="space-y-4">
      {mensurations.map((m) => (
        <li
          key={m.id}
          className="bg-white dark:bg-background p-4 dark:border border rounded shadow text-black dark:text-white"
        >
          <p>
            <strong>📅 Date:</strong> {m.date_mesure}
          </p>
          <p>
            <strong>⚖️ Weight:</strong> {m.poids} kg
          </p>
          <p>
            <strong>📏 Height:</strong> {m.taille} cm
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <p>
              <strong>Biceps:</strong> {m.tour_biceps} cm
            </p>
            <p>
              <strong>Chest:</strong> {m.tour_poitrine} cm
            </p>
            <p>
              <strong>Waist:</strong> {m.tour_taille} cm
            </p>
            <p>
              <strong>Thigh:</strong> {m.tour_cuisse} cm
            </p>
            <button
              onClick={() => handleDelete(m.id)}
              className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
