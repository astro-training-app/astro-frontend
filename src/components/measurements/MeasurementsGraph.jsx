"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const strokeColor = theme === "dark" ? "#ffffff" : "#000000";

  const [activeCurves, setActiveCurves] = useState({
    weight: true,
    height: true,
    biceps: true,
    chest: true,
    waist: true,
    thigh: true,
  });

  const colors = {
    weight: "#8884d8",
    height: "#82ca9d",
    biceps: "#ffc658",
    chest: "#ff7f7f",
    waist: "#6fc2f7",
    thigh: "#aa88ff",
  };

  const labels = {
    weight: "Weight (kg)",
    height: "Height (cm)",
    biceps: "Biceps (cm)",
    chest: "Chest (cm)",
    waist: "Waist (cm)",
    thigh: "Thigh (cm)",
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MEASUREMENTS_ENDPOINT = process.env.NEXT_PUBLIC_MEASUREMENTS_ENDPOINT;
  const MEASUREMENTS_URL = `${API_URL}${MEASUREMENTS_ENDPOINT}`;

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const res = await fetch(`${MEASUREMENTS_URL}/client/${clientId}`, {
          method: "GET",
          credentials: "include", // ✅ Inclut les cookies httpOnly
        });

        const raw = await res.json();
        const sorted = (raw.data || []).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        let last = {
          weight: null,
          height: null,
          biceps: null,
          chest: null,
          waist: null,
          thigh: null,
        };

        const completed = sorted.map((m) => {
          const line = { date: m.date };
          for (const key in last) {
            if (m[key] != null && m[key] !== "") {
              last[key] = m[key];
            }
            line[key] = last[key];
          }
          return line;
        });

        setData(completed);
      } catch (err) {
        console.error("Chart loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [clientId, refresh]);

  if (loading)
    return <p className="text-white text-center">⏳ Loading chart...</p>;
  if (data.length === 0)
    return <p className="text-white text-center">No data available.</p>;

  return (
    <div className="bg-white text-black dark:bg-background dark:text-white border p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">Measurement Progress</h3>

      <div className="mb-6 flex flex-wrap gap-4 text-sm">
        {Object.keys(activeCurves).map((key) => (
          <label key={key} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={activeCurves[key]}
              onChange={() =>
                setActiveCurves((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
            {labels[key]}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke={strokeColor} strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={strokeColor} />
          <YAxis stroke={strokeColor} />
          <Tooltip />
          <Legend />

          {Object.entries(activeCurves).map(
            ([key, active]) =>
              active && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[key] || "#ccc"}
                  name={labels[key] || key}
                  dot={false}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
