"use client";

import { useEffect, useState } from "react";

export default function LatestMeasurement({ clientId, refresh }) {
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
          setLast(data[data.length - 1]); // last entry
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLast();
  }, [clientId, refresh]);

  if (loading) {
    return (
      <p className="text-center text-white">⏳ Loading latest measurement...</p>
    );
  }

  if (!last) {
    return <p className="text-center text-white">No measurements recorded.</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl text-white shadow">
      <h3 className="text-xl font-bold mb-2">Latest Measurement</h3>
      <p>
        <strong>📅 Date:</strong> {last.date_mesure}
      </p>
      <p>
        <strong>⚖️ Weight:</strong> {last.poids} kg
      </p>
      <p>
        <strong>📏 Height:</strong> {last.taille} cm
      </p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <p>
          <strong>Biceps:</strong> {last.tour_biceps} cm
        </p>
        <p>
          <strong>Chest:</strong> {last.tour_poitrine} cm
        </p>
        <p>
          <strong>Waist:</strong> {last.tour_taille} cm
        </p>
        <p>
          <strong>Thigh:</strong> {last.tour_cuisse} cm
        </p>
      </div>
    </div>
  );
}
