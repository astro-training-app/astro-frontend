"use client";

import CoachCard from "@/components/CoachCard";
import { useState, useEffect } from "react";
import MotionLayoutWrapper from "@/components/MotionLayoutWrapper";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const COACHES_ENDPOINT = process.env.NEXT_PUBLIC_COACHES_ENDPOINT;

const URL = `${API_URL}${COACHES_ENDPOINT}`;

export default function TrouverCoach() {
  const [search, setSearch] = useState("");
  const [coaches, setCoaches] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch(`${URL}/all`);
        const data = await res.json();
        console.log(data);
        setCoaches(data.data);
        setFiltered(data.data);
      } catch (err) {
        console.error("Error fetching coaches:", err);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    const results = coaches.filter((coach) => {
      const name = coach.name?.toLowerCase() || "";
      const email = coach.email?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      return name.includes(searchText) || email.includes(searchText);
    });

    setFiltered(results);
  }, [search, coaches]);

  return (
    <MotionLayoutWrapper>
      <div className="w-full max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 bg-background text-secondary">
        <div className="mb-10">
          <h2 className="text-7xl font-bold mb-4">Our coaches</h2>
          <p className="text-subtitle max-w-2xl sm:text-xl text-lg">
            Discover available coaches and contact the one who suits you best.
          </p>
        </div>

        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="search"
            className="block text-sm sm:text-base font-medium text-secondary mb-1"
          >
            Search for a coach:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md px-4 py-2 text-sm sm:text-base text-secondary border border-subtitle focus:outline-primary"
          />
        </div>

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
              <CoachCard name={coach.name} email={coach.email} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </MotionLayoutWrapper>
  );
}
