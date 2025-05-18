"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavBarLink from "./links/NavBarLink";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavBarLink
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className="p-2 rounded border"
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </NavBarLink>
  );
}
