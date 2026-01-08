"use server";
import { createPerson } from "./db";

export async function createPersonAction(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !role) {
    return { error: "All fields are required." };
  }

  try {
    const person = await createPerson({ name, email, role });
    return { success: true, person };
  } catch (error: any) {
    return { error: error.message || "Failed to create person." };
  }
}
