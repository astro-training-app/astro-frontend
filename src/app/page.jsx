"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-4">
      {/* titre principal */}

      <h1 className="text-4xl font-bold mb-4">Fitcoach 🦾</h1>

      {/* texte de description */}

      <p className="text-lg text-center max-w-md mb-6">
        Bienvenue sur FitCoach, l&apos;application pour suivre, gérer et
        personnaliser les programmes sportifs entre coachs et clients
      </p>

      {/* les deux boutons cote à cote */}

      <div className="flex gap-4 mb-6">
        <Button color="blue" onClick={() => router.push("/devenir-coach")}>
          Devenir coach
        </Button>
        <Button color="green" onClick={() => router.push("/trouver-coach")}>
          Trouver un coach
        </Button>
        <Button color="green" onClick={() => router.push("/login")}>
          S'identifier
        </Button>
      </div>

      <Image
        src="/fit-image.svg"
        alt="Sport illustration"
        width={256}
        height={256}
        className="rounded shadow"
      />
    </main>
  );
}
