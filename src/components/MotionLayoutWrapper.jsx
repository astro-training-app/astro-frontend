"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function MotionLayoutWrapper({ children }) {
  const pathname = usePathname(); // 🔑 on récupère le chemin actuel

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // ← Change à chaque route → déclenche animation
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
