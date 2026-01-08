import { hash } from 'bcrypt';

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// If run from the terminal, hash the provided argument
if (require.main === module) {
  const password = process.argv[2];
  if (!password) {
    console.error('Usage: bun run hash.ts <password>');
    process.exit(1);
  }
  await hash(password, 12).then((hashed: string) => {
    console.log(hashed);
  });
}