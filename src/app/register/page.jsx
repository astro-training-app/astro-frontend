"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { useRooter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const REGISTER_ENDPOINT = process.env.NEXT_PUBLIC_REGISTER_ENDPOINT;

const REGISTER_URL = `${API_URL}${REGISTER_ENDPOINT}`;

export default function DevenirCoach() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers,
        body,
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        toast.success("Account successfully created.");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
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
            <label className="block mb-1 text-sm font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label className="block mb-1 text-sm font-bold">Password</label>
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
            Create a Coach Account
          </button>
        </form>
      </div>
    </MotionLayoutWrapper>
  );
}
