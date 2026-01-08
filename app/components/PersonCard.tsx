import React from "react";
import { Person } from "../lib/db";

type PersonCardProps = {
	person: Person;
	children?: React.ReactNode;
};

export default function PersonCard({ person, children }: PersonCardProps) {
	return (
		<div style={{
			border: "1px solid #e0e0e0",
			borderRadius: 8,
			padding: 20,
			margin: "1rem 0",
			background: "#fff",
			maxWidth: 400
		}}>
			<h2 style={{ margin: 0 }}>{person.name}</h2>
			<p style={{ color: "#555", margin: "0.5rem 0" }}><strong>Email:</strong> {person.email}</p>
			<p style={{ color: "#555", margin: "0.5rem 0" }}><strong>Role:</strong> {person.role}</p>
			<p style={{ fontSize: "0.85em", color: "#555", margin: "0.5rem 0" }}>
				Joined: {new Date(person.created_at).toLocaleDateString()}
			</p>
			{children}
		</div>
	);
}
