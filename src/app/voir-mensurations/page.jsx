"use client";
import ListeMensurations from "@/components/mensurations/ListeMensurations";

export default function PageVoirMensurations() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📋 Mensurations enregistrées
      </h1>
      <ListeMensurations />
    </main>
  );
}
