
import { listPersons } from "../lib/db";
import ClicablePersonCard from "../components/ClicablePersonCard";

export default async function PersonsPage() {
  const persons = await listPersons();

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h1 style={{ margin: 0 }}>All Persons</h1>
        <a href="/persons/create" style={{
          background: "#14b8a6",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 500,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          transition: "background 0.2s"
        }}>Add Person</a>
      </div>
      
      {persons.length === 0 ? (
        <p>No persons found.</p>
      ) : (
        persons.map(person => (
          <ClicablePersonCard key={person.id} person={person} />
        ))
      )}
    </main>
  );
}
