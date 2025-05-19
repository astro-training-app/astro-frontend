import React from "react";
import { Menu, X } from "lucide-react";
import { useNavBarContext } from "@/contexts/NavBarContext";

function BurgerBtn({ className = "" }) {
  const { toggleNavBar, isOpen } = useNavBarContext();

  return (
    <button
      onClick={toggleNavBar}
      className={`
        ${className} md:hidden z-50 relative flex justify-center items-center 
        w-10 h-10 rounded-full shadow-md shadow-black/30 cursor-pointer 
        bg-background transition-colors duration-300
      `}
    >
      {/* Menu icon */}
      <Menu
        size={24}
        className={`
          absolute transition-all duration-300
          ${
            isOpen
              ? "opacity-0 scale-90 rotate-45"
              : "opacity-100 scale-100 rotate-0"
          }
        `}
      />
      {/* X icon */}
      <X
        size={24}
        className={`
          absolute transition-all duration-300
          ${
            isOpen
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-90 -rotate-45"
          }
        `}
      />
    </button>
  );
}

export default BurgerBtn;
