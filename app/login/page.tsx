import React from 'react';
import LoginForm from "../lib/login-form";

export default function LoginPage() {
	return (
		<div style={{ maxWidth: 400, margin: "4rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fff" }}>
			<LoginForm />
		</div>
	);
}
