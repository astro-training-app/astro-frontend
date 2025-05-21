"use client";

export default function Button({ children, color = "blue", onClick }) {
  const baseStyles =
    "text-white px-4 py-2 rounded hover:brightness-100 transition";
  const colorStyles = {
    blue: "bg-blue-600",
    green: "bg-green-600",
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
