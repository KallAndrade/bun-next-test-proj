"use server";
import { updatePerson } from "./db";
import { createPerson } from "./db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updatePersonAction(formData: FormData) {
  
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!id || !name || !email || !role) {
    return { error: "All fields are required." };
  }

  try {
    const person = await updatePerson(id, { name, email, role });
    if (!person) {
      return { error: "Person not found or update failed." };
    }
    revalidatePath('/persons');
    console.log("Redirecting to /persons after update");
    redirect('/persons');
    console.log("Redirected to /persons");
  } catch (error: any) {
    console.error("Error updating person:", error);
    return { error: error.message || "Failed to update person." };
  }
}

export async function createPersonAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !role) {
    return { error: "All fields are required." };
  }

  try {
    const person = await createPerson({ name, email, role });
    console.log("Person created with ID:", person.id);
    revalidatePath('/persons');
    console.log("Redirecting to /persons after creation");
    redirect('/persons');
    // return { success: true, person };
  } catch (error: any) {
    return { error: error.message || "Failed to create person." };
  }
}
