"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background text-foreground">
      {/* Titre principal */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        FitCoach 🦾
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-center max-w-xl mb-8">
        Bienvenue sur FitCoach, l&apos;application pour suivre, gérer et
        personnaliser les programmes sportifs entre coachs et clients.
      </p>

      {/* Boutons (empilés sur mobile, côte à côte sur grand écran) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button color="blue" onClick={() => router.push("/devenir-coach")}>
          Devenir coach
        </Button>
        <Button color="green" onClick={() => router.push("/trouver-coach")}>
          Trouver un coach
        </Button>
        <Button color="gray" onClick={() => router.push("/login")}>
          S'identifier
        </Button>
      </div>

      {/* Illustration */}
      <Image
        src="/fit-image.svg"
        alt="Sport illustration"
        width={256}
        height={256}
        className="rounded shadow-lg"
      />
    </main>
  );
}
