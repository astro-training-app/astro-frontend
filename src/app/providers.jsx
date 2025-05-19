"use client";

import { ThemeProvider } from "next-themes";
import { NavBarProvider } from "@/contexts/NavBarContext";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NavBarProvider>{children}</NavBarProvider>
    </ThemeProvider>
  );
}
