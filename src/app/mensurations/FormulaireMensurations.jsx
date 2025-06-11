"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

export default function FormulaireMensurations({ clientId, onNewMensuration }) {
  const [formData, setFormData] = useState({
    date_mesure: "",
    poids: "",
    taille: "",
    tour_biceps: "",
    tour_poitrine: "",
    tour_taille: "",
    tour_cuisse: "",
  });

  const [mensurations, setMensurations] = useState([]);

  // Récupérer les mensurations du client
  useEffect(() => {
    const fetchMensurations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/mensurations/client/${clientId}`
        );
        const data = await res.json();
        setMensurations(data);
      } catch (error) {
        console.error("Error from loading :", error);
        toast.error("Error lors du chargement des mensurations.");
      }
    };

    fetchMensurations();
  }, [clientId]);

  // Gérer les changements dans les champs du formulaire
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Envoi du formulaire
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
          client_id: parseInt(clientId),
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      toast.success("Mensuration successfully added.");
      setFormData({
        date_mesure: "",
        poids: "",
        taille: "",
        tour_biceps: "",
        tour_poitrine: "",
        tour_taille: "",
        tour_cuisse: "",
      });
      if (onNewMensuration) onNewMensuration();
      // Recharger la liste
      setMensurations((prev) => [...prev, result]);
    } catch (err) {
      console.error("❌ Erreur :", err);
      toast.error("An error occurred.");
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 dark:bg-black border rounded-xl dark:text-white max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold">Add a Measurement</h2>

        <input
          type="date"
          name="date_mesure"
          value={formData.date_mesure}
          onChange={handleChange}
          className="input-style"
        />

        <input
          type="number"
          name="poids"
          placeholder="Weight (kg)"
          value={formData.poids}
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="taille"
          placeholder="Height (cm)"
          value={formData.taille}
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="tour_biceps"
          placeholder="Biceps (cm)"
          value={formData.tour_biceps}
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="tour_poitrine"
          placeholder="Chest (cm)"
          value={formData.tour_poitrine}
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="tour_taille"
          placeholder="Waist (cm)"
          value={formData.tour_taille}
          onChange={handleChange}
          className="input-style"
        />
        <input
          type="number"
          name="tour_cuisse"
          placeholder="Thigh (cm)"
          value={formData.tour_cuisse}
          onChange={handleChange}
          className="input-style"
        />

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
        >
          Save Measurement
        </button>
      </form>
    </>
  );
}
