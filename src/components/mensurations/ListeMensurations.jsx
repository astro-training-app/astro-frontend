"use client";

import { useEffect, useState } from "react";

const url = "http://localhost:3000/api/mensurations";

export default function MeasurementList() {
  const [mensuration, setMensuration] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Error while fetching data");
        }
        const data = await res.json();
        setMensuration(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error while deleting data");
      }

      setMensuration((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="grid gap-6">
      {mensuration.map((item) => (
        <div
          key={item.id}
          className="dark:bg-background rounded-lg p-4 shadow-md border bg-white"
        >
          <p className="text-lg font-semibold mb-2">📅 {item.date_mesure}</p>
          <p>⚖️ Weight: {item.poids} kg</p>
          <p>📏 Height: {item.taille} cm</p>
          <p>💪 Biceps: {item.tour_biceps} cm</p>
          <p>🧍 Chest: {item.tour_poitrine} cm</p>
          <p>🧍‍♂️ Waist: {item.tour_taille} cm</p>
          <p>🦵 Thigh: {item.tour_cuisse} cm</p>

          <button
            onClick={() => handleDelete(item.id)}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}
