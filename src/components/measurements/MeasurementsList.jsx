"use client";

import { useEffect, useState } from "react";

const url = "http://localhost:3000/api/measurements";

export default function ListeMensurations() {
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch measurements");
        }
        const data = await res.json();
        setMeasurements(data.data || []);
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
        throw new Error("Failed to delete measurement");
      }

      setMeasurements((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="grid gap-6">
      {measurements.map((item) => (
        <div
          key={item.id}
          className="dark:bg-background rounded-lg p-4 shadow-md border bg-white"
        >
          <p className="text-lg font-semibold mb-2">📅 {item.date}</p>
          <p>⚖️ Weight: {item.weight} kg</p>
          <p>📏 Height: {item.height} cm</p>
          <p>💪 Biceps: {item.biceps} cm</p>
          <p>🧍 Chest: {item.chest} cm</p>
          <p>🧍‍♂️ Waist: {item.waist} cm</p>
          <p>🦵 Thigh: {item.thigh} cm</p>

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
