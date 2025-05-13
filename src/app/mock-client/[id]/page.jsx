"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";
import HistoriqueMensurations from "@/components/HistoriqueMensurations";
import GraphiqueMensurations from "@/components/GraphiqueMensurations";
import DerniereMensuration from "@/components/DerniereMensuration";

export default function MockClientPage() {
  const { id } = useParams();
  const [majGraph, setMajGraph] = useState(false);

  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Fiche Client #{id}
      </h1>

      {/* Formulaire d'ajout */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ajouter une mensuration</h2>
        <FormulaireMensurations
          clientId={id}
          onNewMensuration={() => setMajGraph((v) => !v)}
        />
      </section>

      <section className="mb-12">
        <DerniereMensuration clientId={id} refresh={majGraph} />
      </section>

      {/* Graphique */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Courbe de progression</h2>
        <GraphiqueMensurations clientId={id} refresh={majGraph} />
      </section>

      {/* Historique */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Historique</h2>
        <HistoriqueMensurations
          clientId={id}
          refresh={majGraph}
          refreshNow={() => setMajGraph((v) => !v)}
        />
      </section>
    </main>
  );
}
