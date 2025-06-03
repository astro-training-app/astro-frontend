"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

const url = "http://localhost:3000/api";

export default function DevenirCoach() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ nom, email, password });

    try {
      const res = await fetch(url + "/auth/register", {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        toast.success("🎉 Compte coach créé avec succès !");
      } else {
        toast.error("❌ Erreur à la création du compte.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Problème réseau ou serveur !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionLayoutWrapper>
      <div className="max-w-md mx-auto mt-10 bg-background p-6 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-6 text-secondary">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-bold">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full border border-subtitle px-3 py-2 rounded focus:outline-primary"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-subtitle px-3 py-2 rounded text-secondary focus:outline-primary"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-bold">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-subtitle px-3 py-2 rounded text-secondary focus:outline-primary"
              placeholder="*********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-button-hover-bg transition focus:outline-primary"
          >
            Créer un compte coach
          </button>
        </form>
        <p>{message}</p>
      </div>
    </MotionLayoutWrapper>
  );
}
