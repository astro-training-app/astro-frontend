"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const url = "http://localhost:3000/api/mensurations";

export default function FormulaireMensurations() {
  const [mensurations, setMensurations] = useState({
    date_mesure: "",
    poids: "",
    taille: "",
    tour_biceps: "",
    tour_poitrine: "",
    tour_taille: "",
    tour_cuisse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMensurations((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mensurations),
      });

      if (!response.ok) {
        throw new Error("Failed to submit mensurations");
      }

      // Réinitialisation des valeurs de mensurations
      setMensurations({
        date_mesure: "",
        poids: "",
        taille: "",
        tour_biceps: "",
        tour_poitrine: "",
        tour_taille: "",
        tour_cuisse: "",
      });

      toast.success("Mensurations enregistrées avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des mensurations");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-800 text-white max-w-md mx-auto rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Ajouter une mensuration</h2>

      <input
        type="date"
        name="date_mesure"
        value={mensurations.date_mesure}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="poids"
        placeholder="Poids (kg)"
        value={mensurations.poids}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="taille"
        placeholder="Taille (cm)"
        value={mensurations.taille}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="tour_biceps"
        placeholder="Tour de biceps (cm)"
        value={mensurations.tour_biceps}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="tour_poitrine"
        placeholder="Tour de poitrine (cm)"
        value={mensurations.tour_poitrine}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="tour_taille"
        placeholder="Tour de taille (cm)"
        value={mensurations.tour_taille}
        onChange={handleChange}
        className="input-style"
      />

      <input
        type="number"
        name="tour_cuisse"
        placeholder="Tour de cuisse (cm)"
        value={mensurations.tour_cuisse}
        onChange={handleChange}
        className="input-style"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Enregistrer
      </button>
    </form>
  );
}
