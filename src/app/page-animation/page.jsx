"use client";

import PageTransition from "@/components/PageTransition";

export default function PageAnimation() {
  return (
    <PageTransition>
      <div className="min-h-screen p-10 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Page animée avec entrée/sortie
        </h1>
        <p>On anime maintenant l’entrée ET la sortie !</p>
      </div>
    </PageTransition>
  );
}
