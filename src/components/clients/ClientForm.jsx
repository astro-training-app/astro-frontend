"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function ClientForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const CLIENTS_ENDPOINT = process.env.NEXT_PUBLIC_CLIENTS_ENDPOINT;

  const URL = `${API_URL}${CLIENTS_ENDPOINT}`;

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    gender: "",
    age: "",
    goal: "",
    photo: null,
  });

  const [fileKey, setFileKey] = useState(Date.now());

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lastName: formData.lastName,
          firstName: formData.firstName,
          email: formData.email,
          age: parseInt(formData.age),
          gender: formData.gender,
          goal: formData.goal,
          photo: "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        toast.success("Client successfully created.");
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          age: "",
          gender: "",
          goal: "",
          photo: null,
        });
        setFileKey(Date.now());
      }
    } catch (err) {
      toast.error("Error while creating the client.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2 className="form-title">Add client</h2>

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        value={formData.lastName}
        className="input-style"
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        value={formData.firstName}
        className="input-style"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        className="input-style"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        value={formData.age}
        className="input-style"
      />

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            onChange={handleChange}
            checked={formData.gender === "M"}
          />{" "}
          Men
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="W"
            onChange={handleChange}
            checked={formData.gender === "W"}
          />{" "}
          Women
        </label>
      </div>

      <select
        name="goal"
        onChange={handleChange}
        value={formData.goal}
        className="input-style"
      >
        <option value="">Select a goal</option>
        <option value="weight loss">Weight loss</option>
        <option value="mass gain">Mass gain</option>
        <option value="toning">Toning</option>
      </select>

      <input
        key={fileKey}
        type="file"
        name="photo"
        onChange={handleChange}
        className="input-style hover:cursor-pointer gap-4 underline"
      />

      <button type="submit" className="btn-primary">
        Send
      </button>
    </form>
  );
}
