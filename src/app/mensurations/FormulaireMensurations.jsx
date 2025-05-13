"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


export default function FormulaireMensurations({ clientId }) {
  const [formData, setFormData] = useState({
    date_mesure: "",
    poids: "",
    taille: "",
    tour_biceps: "",
    tour_poitrine: "",
    tour_taille: "",
    tour_cuisse: "",
  });

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

      const response = await fetch("http://localhost:3000/api/mensurations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          poids: parseFloat(formData.poids),
          taille: parseFloat(formData.taille),
          tour_biceps: parseFloat(formData.tour_biceps),
          tour_poitrine: parseFloat(formData.tour_poitrine),
          tour_taille: parseFloat(formData.tour_taille),
          tour_cuisse: parseFloat(formData.tour_cuisse),
          client_id: parseInt(clientId), // 🧠 la ligne clé
        }),
      });

      const result = await response.json();
      console.log("✅ Mensuration envoyée :", result);
    } catch (err) {
      console.error("❌ Erreur :", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-800 rounded-xl text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold">Ajouter une mensuration</h2>

      <input
        type="date"
        name="date_mesure"
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="poids"
        placeholder="Poids (kg)"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="taille"
        placeholder="Taille (cm)"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="tour_biceps"
        placeholder="Tour de biceps (cm)"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="tour_poitrine"
        placeholder="Tour de poitrine (cm)"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="tour_taille"
        placeholder="Tour de taille (cm)"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="tour_cuisse"
        placeholder="Tour de cuisse (cm)"
        onChange={handleChange}
        className="input-style"
      />

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer la mensuration
      </button>
    </form>
  );
}
