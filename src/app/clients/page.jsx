"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import ClientCard from "@/components/clients/ClientCard";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const checking = useProtectedRoute();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENTS_ENDPOINT = process.env.NEXT_PUBLIC_CLIENTS_ENDPOINT;
  const URL = `${API_URL}${CLIENTS_ENDPOINT}`;

  async function handleDeleteClient(id) {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    } else {
      console.error("Erreur de suppression");
    }
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        if (result?.data) {
          setClients(result.data);
        }
      } catch (error) {
        console.error("Error while fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  if (checking) return <p className="p-10 rounded-lg">Loading...</p>;

  return (
    <main className="text-black dark:text-white p-10">
      <MotionLayoutWrapper>
        <h1 className="text-3xl font-bold mb-6 text-center">Client List</h1>

        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-6 justify-items-center">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onDelete={handleDeleteClient}
            />
          ))}

          {/* Carte Ajouter un client */}
          <div className="w-auto border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl shadow p-6 mx-auto hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Link
              href="/add-client"
              className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline"
            >
              <Plus /> Add client
            </Link>
          </div>
        </div>
      </MotionLayoutWrapper>
    </main>
  );
}
