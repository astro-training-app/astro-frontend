"use client";

import ClientForm from "@/components/clients/ClientForm";
import useProtectedRoute from "@/hooks/useProtectedRoute";

export default function PageAjouterClient() {
  const checking = useProtectedRoute();

  if (checking) return null;

  return (
    <main className="min-h-screen dark:bg-background dark:text-white py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Ajouter un client</h1>
      <ClientForm />
    </main>
  );
}
