"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavBarLink from "./links/NavBarLink";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NavBarLink
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="p-2 rounded border"
      icon={theme === "dark" ? <Sun /> : <Moon />}
    >
      {theme === "dark" ? "Light" : "Dark"} mode
    </NavBarLink>
  );
}
