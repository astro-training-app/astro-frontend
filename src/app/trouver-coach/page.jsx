"use client";

import CoachCard from "@/components/CoachCard";
import { useState, useEffect } from "react";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { motion } from "framer-motion";

// Animation container for the list
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

// Animation for each item
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FindCoach() {
  const [search, setSearch] = useState(""); // Text search
  const [coaches, setCoaches] = useState([]); // Fetched coaches
  const [filtered, setFiltered] = useState([]); // Filtered coaches

  // Fetch coaches when page loads
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/coaches/all");
        const data = await res.json();
        setCoaches(data.data);
        setFiltered(data.data);
      } catch (err) {
        console.error("Error while fetching coaches:", err);
      }
    };

    fetchCoaches();
  }, []);

  // Filter results when typing (excluding description)
  useEffect(() => {
    const results = coaches.filter((coach) => {
      const name = coach.nom?.toLowerCase() || "";
      const email = coach.email?.toLowerCase() || "";
      const query = search.toLowerCase();

      return name.includes(query) || email.includes(query);
    });

    setFiltered(results);
  }, [search, coaches]);

  return (
    <MotionLayoutWrapper>
      <div className="w-full max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 bg-background text-secondary">
        <div className="mb-10">
          <h2 className="text-7xl font-bold mb-4">Our Coaches</h2>
          <p className="text-subtitle max-w-2xl sm:text-xl text-lg">
            Discover the available coaches and get in touch with the one that
            suits you best.
          </p>
        </div>

        {/* 🔍 Search bar */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="search"
            className="block text-sm sm:text-base font-medium text-secondary mb-1"
          >
            Search for a coach
          </label>
          <input
            type="text"
            id="search"
            placeholder="Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-4 py-2 text-sm sm:text-base text-secondary border border-subtitle focus:outline-primary"
          />
        </div>

        {/* Animated list of coaches */}
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
