"use client";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";

export default function PageMensurations() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ajouter une mensuration
      </h1>
      <FormulaireMensurations />
    </main>
  );
}
