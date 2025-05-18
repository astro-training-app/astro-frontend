"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

function NavBarLink({ children, href, icon, onClick, variant = "primary" }) {
  const pathname = usePathname();
  const isActive = href === pathname;
  const primaryStyles = "text-secondary hover:bg-btn-hover";
  const primarySelectedStyle = "bg-blue-600/15 text-blue-600";

  const secondaryStyles = "text-red-600  hover:bg-red-500/10";
  const secondarySelectedStyle = "bg-red-500/10 text-red-600";

  const styles = variant === "primary" ? primaryStyles : secondaryStyles;
  const selectedStyle =
    variant === "primary" ? primarySelectedStyle : secondarySelectedStyle;

  const content = (
    <>
      <div className="font-normal flex items-center gap-2">
        {/* align icon center */}
        <span className="w-5 h-5 flex items-center">{icon}</span>

        {children}
      </div>
      {isActive && <ChevronRight className="w-4 h-4" />}
    </>
  );

  return onClick ? (
    <button
      className={`${styles} ${
        isActive ? selectedStyle : ""
      } flex items-center gap-2 px-4 py-2 rounded`}
      onClick={onClick}
    >
      {content}
    </button>
  ) : (
    <Link
      href={href}
      className={`px-4 py-2 rounded flex justify-between ${
        isActive ? `${selectedStyle}` : `${styles}`
      }`}
    >
      {content}
    </Link>
  );
}

export default NavBarLink;
