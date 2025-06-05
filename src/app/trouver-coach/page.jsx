"use client";

import CoachCard from "@/components/CoachCard";
import { useState, useEffect } from "react";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { motion } from "framer-motion";

// Animation container pour la liste
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

// Animation des éléments
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TrouverCoach() {
  const [search, setSearch] = useState(""); // Recherche texte
  const [coachs, setCoachs] = useState([]); // Coachs récupérés
  const [filtered, setFiltered] = useState([]); // Coachs filtrés

  // je recup les coachs au chargement de la page
  useEffect(() => {
    const fetchCoachs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/coaches");
        const data = await res.json();
        setCoachs(data.data);
        setFiltered(data.data);
        console.log("data reçue :", data);
      } catch (err) {
        console.error("Erreur lors du fetch des coachs :", err);
      }
    };

    fetchCoachs();
  }, []);

  // Filtrage quand on tape dmais avec la despcription en moins
  useEffect(() => {
    const resultats = coachs.filter((coach) => {
      const nom = coach.nom?.toLowerCase() || "";
      const email = coach.email?.toLowerCase() || "";
      const recherche = search.toLowerCase();

      return nom.includes(recherche) || email.includes(recherche);
    });

    setFiltered(resultats);
  }, [search, coachs]);

  return (
    <MotionLayoutWrapper>
      <div className="w-full max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 bg-background text-secondary">
        <div className="mb-10">
          <h2 className="text-7xl font-bold mb-4">Nos coachs</h2>
          <p className="text-subtitle max-w-2xl sm:text-xl text-lg">
            Découvrez les coachs disponibles, et contactez celui qui vous
            correspond.
          </p>
        </div>

        {/* 🔍 Barre de recherche */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="search"
            className="block text-sm sm:text-base font-medium text-secondary mb-1"
          >
            Rechercher un coach :
          </label>
          <input
            type="text"
            id="search"
            placeholder="Nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-4 py-2 text-sm sm:text-base text-secondary border border-subtitle focus:outline-primary"
          />
        </div>

        {/* Liste animée des coachs filtrés */}
        <motion.ul
          className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-6 sm:gap-8 justify-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((coach) => (
            <motion.li
              key={coach.id}
              variants={fadeUp}
              className="w-full flex justify-center"
            >
              <CoachCard nom={coach.nom} email={coach.email} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </MotionLayoutWrapper>
  );
}
