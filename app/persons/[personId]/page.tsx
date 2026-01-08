import { getPersonById } from "@/app/lib/db";
import PersonCard from "@/app/components/PersonCard";
import { notFound } from "next/navigation";
import Link from "next/link";

type PersonPageProps = {
  params: {
    personId: string;
  };
};

export default async function PersonPage(
  {
    params
  }: {
    params: Promise<{ personId: string }>
  }) {
    const { personId } = await params;
  const person = await getPersonById(personId);

  if (!person) {
    console.log("Person not found, triggering 404");
    notFound();
  }

  return (
    <div className="p-16">
      <h1>Person Details</h1>
      <PersonCard person={person} />
      <div style={{ display: "inline-block", border: "1px solid #000", borderRadius: 8, padding: "0.25rem 0.75rem", marginTop: "1rem" }}>
        <Link href={`/persons/${person.id}/edit`} style={{ textDecoration: "none", color: "inherit" }}>Edit Person</Link>
      </div>
    </div>
  );
}