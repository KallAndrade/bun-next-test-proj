import { createPerson } from "@/app/lib/db";

export async function POST(req: Request) {
  const data = await req.json();

  // Accepts either a single object or an array of objects
  const personsArray = Array.isArray(data) ? data : [data];

  // Validate all entries
  const invalid = personsArray.some(
    (p) => !p.name || !p.email || !p.role
  );
  if (invalid) {
    return new Response(
      JSON.stringify({ error: "Each person must have name, email, and role." }),
      { status: 400 }
    );
  }

  try {
    const createdPersons = [];
    for (const person of personsArray) {
      const newPerson = await createPerson({
        name: person.name,
        email: person.email,
        role: person.role,
      });
      createdPersons.push(newPerson);
    }
    return new Response(JSON.stringify(createdPersons), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create person(s)." }),
      { status: 500 }
    );
  }
}