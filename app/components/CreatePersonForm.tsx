"use client";
import React, { useState, useTransition } from "react";
import { createPersonAction } from "../lib/actions";

export default function CreatePersonForm() {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await createPersonAction(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Person created successfully!");
        setForm({ name: "", email: "", role: "" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #eee", borderRadius: 8, background: "#fff" }}>
      <h2>Create New Person</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          type="text"
          value={form.role}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>
      <button type="submit" style={{ background: "#14b8a6", color: "#fff", padding: "0.5rem 1rem", borderRadius: 6, border: "none", fontWeight: 500 }}>
        {/* {loading ? "Creating..." : "Create Person"} */}
      </button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
    </form>
  );
}
