"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { toast } from "react-hot-toast";

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
      router.push("/");
    } else {
      toast.error(data.message);
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
                placeholder="Your email"
                required
                className="input-style"
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="input-style"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-button-hover-bg transition duration-300 ease-in-out"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </MotionLayoutWrapper>
  );
}
