import { handleCreatePersonAction } from "../lib/actions";

export default function CreatePersonForm() {

  return (
    <form action={handleCreatePersonAction} style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #eee", borderRadius: 8, background: "#fff" }}>
      <h2>Create New Person</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
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
          required
          style={{ width: "100%", padding: "0.5rem", marginTop: 4, border: "1px solid #ccc", borderRadius: 4 }}
        />
      </div>
      <button type="submit" style={{ background: "#14b8a6", color: "#fff", padding: "0.5rem 1rem", borderRadius: 6, border: "none", fontWeight: 500 }}>
        {/* {loading ? "Creating..." : "Create Person"} */}
      </button>
    </form>
  );
}
