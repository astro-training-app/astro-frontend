"use client";

export default function Button({ children, color = "blue", onClick }) {
  const baseStyles =
    "px-6 py-4 rounded hover:brightness-100 transition cursor-pointer";
  const colorStyles = {
    blue: "bg-primary text-gray-200",
    emptyBlue: "bg-transparent border-1 border-primary text-primary",
    red: "bg-red-600",
    gray: "bg-gray-600",
  };

  return (
    <button
      className={`${baseStyles} ${colorStyles[color] || colorStyles.blue}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
