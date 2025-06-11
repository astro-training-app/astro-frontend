"use client";
import { useEffect, useState } from "react";

export default function FetchCoachTest() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/coaches")
      .then((res) => res.json())
      .then((data) => {
        setCoaches(data);
      })
      .catch((err) => {
        console.error("Error fetching coaches:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List of Coaches:</h1>
      <ul>
        {coaches.map((coach, index) => (
          <li key={index}>
            {coach.name} – {coach.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
