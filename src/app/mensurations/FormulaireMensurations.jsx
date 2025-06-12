"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function FormulaireMensurations({ clientId, onNewMensuration }) {
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    height: "",
    biceps: "",
    chest: "",
    waist: "",
    thigh: "",
  });

  const [mensurations, setMensurations] = useState([]);

  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/measurements/client/${clientId}`
        );
        const data = await res.json();
        setMensurations(data.data || []);
      } catch (error) {
        console.error("Error loading measurements:", error);
        toast.error("Failed to load measurements.");
      }
    };

    fetchMensurations();
  }, [clientId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await fetch("http://localhost:3000/api/measurements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          weight: parseFloat(formData.weight),
          height: parseFloat(formData.height),
          biceps: parseFloat(formData.biceps),
          chest: parseFloat(formData.chest),
          waist: parseFloat(formData.waist),
          thigh: parseFloat(formData.thigh),
          client_id: parseInt(clientId),
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success("Measurement successfully added.");
      setFormData({
        date: "",
        weight: "",
        height: "",
        biceps: "",
        chest: "",
        waist: "",
        thigh: "",
      });
      if (onNewMensuration) onNewMensuration();
      setMensurations((prev) => [...prev, result]);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("An error occurred.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 dark:bg-black border rounded-xl dark:text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold">Add a Measurement</h2>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight (kg)"
        value={formData.weight}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={formData.height}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="biceps"
        placeholder="Biceps (cm)"
        value={formData.biceps}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="chest"
        placeholder="Chest (cm)"
        value={formData.chest}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="waist"
        placeholder="Waist (cm)"
        value={formData.waist}
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="thigh"
        placeholder="Thigh (cm)"
        value={formData.thigh}
        onChange={handleChange}
        className="input-style"
      />

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white w-full"
      >
        Save measurement
      </button>
    </form>
  );
}
