"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";
import HistoriqueMensurations from "@/components/mensurations/HistoriqueMensurations";
import GraphiqueMensurations from "@/components/mensurations/GraphiqueMensurations";

export default function AjouterMensurationsPage() {
  const { id } = useParams();

  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen dark:bg-background dark:text-white text-black p-10 space-y-10">
      <h1 className="text-3xl font-bold text-center">
        Body Measurements #{id}
      </h1>

      {/* ✅ Formulaire d’ajout */}
      <FormulaireMensurations clientId={id} onNewMensuration={handleRefresh} />

      {/* ✅ Historique + suppression */}
      <HistoriqueMensurations
        clientId={id}
        refresh={refresh}
        refreshNow={handleRefresh}
      />

      {/* ✅ Graphique dynamique */}
      <GraphiqueMensurations clientId={id} refresh={refresh} />
    </main>
  );
}
