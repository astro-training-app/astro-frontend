"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import ClientCard from "@/components/clients/ClientCard";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const checking = useProtectedRoute();

  async function handleDeleteClient(id) {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
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
        const token = Cookies.get("token");

        const response = await fetch("http://localhost:3000/api/clients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result?.data) {
          setClients(result.data);
        }
      } catch (error) {
        console.error("❌ Erreur lors du fetch des clients :", error);
      }
    };

    fetchClients();
  }, []);

  if (checking)
    return (
      <p className="bg-gray-200 text-gray-800 p-10 rounded-lg">Chargement...</p>
    );

  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((r) => r + 1);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Liste des clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onDelete={handleDeleteClient}
          />
        ))}
      </div>
    </div>
  );
}
