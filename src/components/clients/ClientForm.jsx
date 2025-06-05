"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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

  // Pour forcer la remise à zéro du champ fichier
  const [fileKey, setFileKey] = useState(Date.now());

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
      const token = Cookies.get("token");

      const response = await fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          age: parseInt(formData.age),
          sexe: formData.sexe,
          objectif: formData.objectif,
          photo: "", // Champ temporaire, géré plus tard
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        console.log("✅ Client créé :", result);
        toast.success("Client créé !");

        // Reset du formulaire
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          age: "",
          sexe: "",
          objectif: "",
          photo: null,
        });

        // Réinitialiser le champ file visuellement
        setFileKey(Date.now());
      }
    } catch (err) {
      console.error("❌ Erreur envoi client :", err);
      toast.error("Erreur lors de la création du client.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 dark:bg-background border rounded-xl dark:text-white max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold">Ajouter un client</h2>

      <input
        type="text"
        name="nom"
        placeholder="Nom"
        onChange={handleChange}
        value={formData.nom}
        className="input-style"
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        onChange={handleChange}
        value={formData.prenom}
        className="input-style"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        className="input-style"
      />
      <input
        type="number"
        name="age"
        placeholder="Âge"
        onChange={handleChange}
        value={formData.age}
        className="input-style"
      />

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="sexe"
            value="H"
            onChange={handleChange}
            checked={formData.sexe === "H"}
          />{" "}
          Homme
        </label>
        <label>
          <input
            type="radio"
            name="sexe"
            value="F"
            onChange={handleChange}
            checked={formData.sexe === "F"}
          />{" "}
          Femme
        </label>
      </div>

      <select
        name="objectif"
        onChange={handleChange}
        value={formData.objectif}
        className="input-style"
      >
        <option value="">Choisir un objectif</option>
        <option value="perte de poids">Perte de poids</option>
        <option value="prise de masse">Prise de masse</option>
        <option value="tonification">Tonification</option>
      </select>

      <input
        key={fileKey}
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
