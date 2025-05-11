"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={
          typeof window !== "undefined" ? window.location.pathname : "static"
        }
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen p-10 text-black dark:text-white bg-gray-100 dark:bg-gray-900"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
