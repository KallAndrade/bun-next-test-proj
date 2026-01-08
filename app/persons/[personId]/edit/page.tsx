import { getPersonById } from "@/app/lib/db";
import UpdatePersonForm from "@/app/components/UpdatePersonForm";
import { notFound } from "next/navigation";

export default async function EditPersonPage({ params }: { params: { personId: string } }) {
  const { personId } = await params;
  const person = await getPersonById(personId);
  if (!person) {
    notFound();
  }
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1>Edit Person</h1>
      <UpdatePersonForm person={person} />
    </div>
  );
}
