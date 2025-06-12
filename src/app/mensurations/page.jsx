"use client";
import FormulaireMensurations from "@/app/mensurations/FormulaireMensurations";
import ListeMensurations from "@/components/mensurations/ListeMensurations";

export default function PageMensurations() {
  return (
    <main className="min-h-screen bg-white text-black p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a Measurement</h1>
      <FormulaireMensurations />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Measurements
        </h2>
        <ListeMensurations />
      </div>
    </main>
  );
}
