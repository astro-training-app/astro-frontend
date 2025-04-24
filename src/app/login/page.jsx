"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggued, setLogged] = useState(false);
  const [message, setMessage] = useState("");

  const LogClients = [
    { email: "abc@abc.com", password: "abc" },
    { email: "123@123.com", password: "123" },
  ];

  const verification = (e) => {
    e.preventDefault();

    const isValid = LogClients.some(
      (e) => e.email === email && e.password === password
    );

    if (isValid) {
      setLogged(true);
      setMessage("Bienvenue à vous !");
    } else {
      setLogged(false);
      setMessage("L'email ou le mot de passe sont incorrect !");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>
        <form onSubmit={verification} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Se connecter
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              loggued ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
