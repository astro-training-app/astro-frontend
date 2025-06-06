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
          photo: "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        toast.success("Client créé !");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          age: "",
          sexe: "",
          objectif: "",
          photo: null,
        });
        setFileKey(Date.now());
      }
    } catch (err) {
      toast.error("Erreur lors de la création du client.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2 className="form-title">Ajouter un client</h2>

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
        className="input-style hover:cursor-pointer gap-4 underline"
      />

      <button type="submit" className="btn-primary">
        Envoyer
      </button>
    </form>
  );
}
