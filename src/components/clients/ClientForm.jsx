"use client";
import { useState } from "react";
import Cookies from "js-cookie";

export default function ClientForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    age: "",
    sexe: "",
    objectif: "",
    photo: null,
  });

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = Cookies.get("token"); // Récupération du token stocké
      const response = await fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Le back a besoin du token pour savoir qui est connecté
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          age: parseInt(formData.age),
          sexe: formData.sexe,
          objectif: formData.objectif,
          photo: "", // Champ temporaire, géré plus tard avec multer
        }),
      });

      const result = await response.json();
      console.log("✅ Client créé :", result);
    } catch (err) {
      console.error("❌ Erreur envoi client :", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-800 rounded-xl text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold">Ajouter un client</h2>

      <input
        type="text"
        name="nom"
        placeholder="Nom"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="input-style"
      />
      <input
        type="number"
        name="age"
        placeholder="Âge"
        onChange={handleChange}
        className="input-style"
      />

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="sexe"
            value="homme"
            onChange={handleChange}
          />{" "}
          Homme
        </label>
        <label>
          <input
            type="radio"
            name="sexe"
            value="femme"
            onChange={handleChange}
          />{" "}
          Femme
        </label>
      </div>

      <select name="objectif" onChange={handleChange} className="input-style">
        <option value="">Choisir un objectif</option>
        <option value="perte de poids">Perte de poids</option>
        <option value="prise de masse">Prise de masse</option>
        <option value="tonification">Tonification</option>
      </select>

      <input
        type="file"
        name="photo"
        onChange={handleChange}
        className="input-style"
      />

      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Envoyer
      </button>
    </form>
  );
}
