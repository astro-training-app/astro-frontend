// src/app/test/page.jsx
"use client";

import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter();

  return (
    <div className="p-8">
      <h1>Test Navigation</h1>
      <button onClick={() => router.push("/")}>Retour accueil</button>
    </div>
  );
}
