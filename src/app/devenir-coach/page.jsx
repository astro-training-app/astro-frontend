"use client";

{
  /* route pour la page coach */
}

import { useState } from "react";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

const url = "http://localhost:3000/api";

export default function DevenirCoach() {
  {
    /* les useState */
  }

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  {
    /* fonction pou rle formulaire */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Nom :", nom);
    console.log("Email :", email);
    console.log("Mot de passe :", password);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      nom,
      email,
      password,
    });

    const res = await fetch(url + "/auth/register", {
      method: "POST",
      headers,
      body,
    });
    console.log(res);
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
    }
  };

  return (
    <MotionLayoutWrapper>
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Créer un compte Coach
        </h2>

        {/* formulaire */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* nom */}

          <div>
            <label className="block mb-1 font-medium text-gray-800">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-gray-100 border border-gray-500 px-3 py-2 rounded text-gray-800"
              placeholder="John Doe"
              required
            />
          </div>

          {/* email */}

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border border-gray-500 px-3 py-2 rounded text-gray-800"
              placeholder="John@exemple.fr"
              required
            />
          </div>

          {/* password */}

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 border border-gray-500 px-3 py-2 rounded text-gray-800"
              placeholder="*********"
              required
            />
          </div>

          {/* bouton de soumission */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Créer un compte coach
          </button>
        </form>
        <p>{message}</p>
      </div>
    </MotionLayoutWrapper>
  );
}
