"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_LOGIN_ENDPOINT;
const LOGIN_URL = `${API_URL}${LOGIN_ENDPOINT}`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const verification = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Logged in successfully");
      await refreshAuth();
      router.refresh();
      router.push("/");
    } catch (err) {
      toast.error("An error occurred during login.");
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
