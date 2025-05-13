"use client";

import { useParams } from "next/navigation";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";

export default function AjouterMensurationsPage() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ajouter une mensuration pour le client #{id}
      </h1>

      <FormulaireMensurations />
    </main>
  );
}
