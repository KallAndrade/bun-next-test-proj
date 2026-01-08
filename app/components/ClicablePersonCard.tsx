"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Person } from "../lib/db";

interface ClicablePersonCardProps {
  person: Person;
  children?: React.ReactNode;
}

export default function ClicablePersonCard({ person, children }: ClicablePersonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/persons/${person.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: 20,
        margin: "1rem 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        background: "#fff",
        maxWidth: 400,
        cursor: "pointer",
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${person.name}`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <h2 style={{ margin: 0 }}>{person.name}</h2>
      <p style={{ color: "#555", margin: "0.5rem 0" }}><strong>Email:</strong> {person.email}</p>
      <p style={{ color: "#888", margin: "0.5rem 0" }}><strong>Role:</strong> {person.role}</p>
      <p style={{ fontSize: "0.85em", color: "#aaa", margin: "0.5rem 0" }}>
        Joined: {new Date(person.created_at).toLocaleDateString()}
      </p>
      {children}
    </div>
  );
}
