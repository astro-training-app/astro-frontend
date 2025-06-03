"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";

const url = "http://localhost:3000/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const verification = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ email, password });

    const res = await fetch(url + "/auth/login", {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json();
    const cookieTimer = new Date(data.expireAt);
    setMessage(data.message);

    if (res.ok) {
      Cookies.set("token", data.token, { expires: cookieTimer });
      setIsAuthenticated(true);
      toast.success("Connexion réussie !");
      setTimeout(() => {
        router.push("/profil");
      }, 2000);
    } else {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <MotionLayoutWrapper>
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome back</h1>
          <form onSubmit={verification} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="w-full px-4 py-2 rounded text-secondary border border-subtitle focus:outline-primary"
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
                className="w-full px-4 py-2 rounded text-secondary border border-subtitle focus:outline-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-button-hover-bg transition duration-300 ease-in-out"
            >
              Se connecter
            </button>
          </form>

          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>
    </MotionLayoutWrapper>
  );
}
