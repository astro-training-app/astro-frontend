"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const url = "http://localhost:3000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggued, setLogged] = useState(false);
  const [message, setMessage] = useState("");
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const verification = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
      email,
      password,
    });

    const res = await fetch(url + "/auth/login", {
      method: "POST",
      headers,
      body,
    });
    console.log(res);
    const data = await res.json();
    const cookieTimer = new Date(data.expireAt);
    setMessage(data.message);
    console.log(data);
    if (res.ok) {
      setLogged(true);
      Cookies.set("token", data.token, { expires: cookieTimer });
      setIsAuthenticated(true); // dis au contexte qu'on est connecté
      router.push("/profil"); // redirige vers la page de profil
    } else {
      setLogged(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
      <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
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
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
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
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
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
