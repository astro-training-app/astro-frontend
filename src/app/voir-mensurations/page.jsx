"use client";
import ListeMensurations from "@/components/mensurations/ListeMensurations";

export default function PageVoirMensurations() {
  return (
    <main className="min-h-screen bg-white dark:bg-background dark:text-white text-black p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📋 Measurement saved
      </h1>
      <ListeMensurations />
    </main>
  );
}

