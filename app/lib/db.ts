// lib/db.ts
import postgres from "postgres";


const DATABASE_URL = process.env.DATABASE_URL!;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
} else {
  console.log("Using DATABASE_URL:", DATABASE_URL);
}

export const sql = postgres(process.env.DATABASE_URL!);

export async function createTables() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

  await sql`
    CREATE TABLE IF NOT EXISTS persons (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      role VARCHAR(255) NOT NULL
    );
    `;

  await sql`CREATE TABLE IF NOT EXISTS compliments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      sender_id UUID NOT NULL,
      receiver_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      FOREIGN KEY (sender_id) REFERENCES persons(id) ON DELETE CASCADE,
      FOREIGN KEY (receiver_id) REFERENCES persons(id) ON DELETE CASCADE
    );
  `;
}

export type Person = {
  id: string;
  name: string;
  email: string;
  created_at: string | Date;
  updated_at: string | Date;
  role: string;
};

export type Compliment = {
  id: string;
  title: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string | Date;
  updated_at: string | Date;
};

// Persons CRUD
export async function createPerson(data: { name: string; email: string; role: string }): Promise<Person> {
  const [row] = await sql<Person[]>`
    INSERT INTO persons (name, email, role)
    VALUES (${data.name}, ${data.email}, ${data.role})
    RETURNING *
  `;
  return row;
}

export async function getPersonById(id: string): Promise<Person | null> {
  const rows = await sql<Person[]>`SELECT * FROM persons WHERE id = ${id}`;
  return rows[0] ?? null;
}

export async function listPersons(): Promise<Person[]> {
  return await sql<Person[]>`SELECT * FROM persons ORDER BY created_at DESC`;
}

export async function updatePerson(id: string, data: { name: string; email: string; role: string }): Promise<Person | null> {
  const [row] = await sql<Person[]>`
    UPDATE persons
    SET name = ${data.name}, email = ${data.email}, role = ${data.role}, updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return row ?? null;
}

export async function deletePerson(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM persons WHERE id = ${id} RETURNING id`;
  return result.count > 0 || (Array.isArray(result) && result.length > 0);
}

// Compliments CRUD
export async function createCompliment(data: { title: string; content: string; sender_id: string; receiver_id: string; }): Promise<Compliment> {
  const [row] = await sql<Compliment[]>`
    INSERT INTO compliments (title, content, sender_id, receiver_id)
    VALUES (${data.title}, ${data.content}, ${data.sender_id}, ${data.receiver_id})
    RETURNING *
  `;
  return row;
}

export async function getComplimentById(id: string): Promise<Compliment | null> {
  const rows = await sql<Compliment[]>`SELECT * FROM compliments WHERE id = ${id}`;
  return rows[0] ?? null;
}

export async function listCompliments(): Promise<Compliment[]> {
  return await sql<Compliment[]>`SELECT * FROM compliments ORDER BY created_at DESC`;
}

export async function updateCompliment(id: string, data: { title: string; content: string; }): Promise<Compliment | null> {
  const [row] = await sql<Compliment[]>`
    UPDATE compliments
    SET title = ${data.title}, content = ${data.content}, updated_at = now()
    WHERE id = ${id}
    RETURNING *
  `;
  return row ?? null;
}

export async function deleteCompliment(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM compliments WHERE id = ${id} RETURNING id`;
  return result.count > 0 || (Array.isArray(result) && result.length > 0);
}