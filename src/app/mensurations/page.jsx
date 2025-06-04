"use client";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";
import ListeMensurations from "@/components/mensurations/ListeMensurations";

export default function PageMensurations() {
  return (
    <main className="min-h-screen bg-white text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ajouter une mensuration
      </h1>
      <FormulaireMensurations />
    </main>
  );
}
