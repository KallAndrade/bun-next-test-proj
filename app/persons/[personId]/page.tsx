import { getPersonById } from "@/app/lib/db";
import PersonCard from "@/app/components/PersonCard";
import { notFound } from "next/navigation";

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
      
    </div>
  );
}