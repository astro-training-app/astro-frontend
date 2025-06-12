"use client";

import { useEffect, useState } from "react";

export default function HistoriqueMensurations({
  clientId,
  refresh,
  refreshNow,
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MEASUREMENTS_ENDPOINT = process.env.NEXT_PUBLIC_MEASUREMENTS_ENDPOINT;
  const URL = `${API_URL}${MEASUREMENTS_ENDPOINT}`;

  const [mensurations, setMensurations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(`${URL}/client/${clientId}`);
        const result = await res.json();

        const raw = result.data || [];

        const sorted = raw.sort((a, b) => new Date(a.date) - new Date(b.date));

        let last = {
          weight: null,
          height: null,
          biceps: null,
          chest: null,
          waist: null,
          thigh: null,
        };

        const completed = sorted.map((m) => {
          const filled = { ...m };
          for (const key in last) {
            if (m[key] != null && m[key] !== "") last[key] = m[key];
            filled[key] = last[key];
          }
          return filled;
        });

        setMensurations(completed);
      } catch (err) {
        console.error("Loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMensurations();
  }, [clientId, refresh]);

  if (loading) return <p className="text-center">⏳ Loading...</p>;
  if (mensurations.length === 0)
    return <p className="text-center">No measurements recorded.</p>;

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this measurement?")) return;

    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete error");

      if (typeof refreshNow === "function") refreshNow();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete this measurement.");
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
            <strong>Date:</strong> {m.date}
          </p>
          <p>
            <strong>Weight:</strong> {m.weight} kg
          </p>
          <p>
            <strong>Height:</strong> {m.height} cm
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <p>
              <strong>Biceps:</strong> {m.biceps} cm
            </p>
            <p>
              <strong>Chest:</strong> {m.chest} cm
            </p>
            <p>
              <strong>Waist:</strong> {m.waist} cm
            </p>
            <p>
              <strong>Thigh:</strong> {m.thigh} cm
            </p>
            <button
              onClick={() => handleDelete(m.id)}
              className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded col-span-2"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
