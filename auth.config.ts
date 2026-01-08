import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'; 
import { getPersonByEmail } from './app/lib/db';
import { compare } from "bcrypt";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isLoginPage = nextUrl.pathname === '/login';

        if (isLoggedIn) {
          return true;
        }

        // Allow access only to the login page if not logged in
        if (isLoginPage) {
          return true;
        }

        // Redirect all other pages to login
        return Response.redirect(new URL('/login', nextUrl));
    },
  },
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string(), password: z.string().min(6) })
        .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const person = await getPersonByEmail(email);

        if (!person) return null;
          const passwordsMatch = await compare(password, person.password || "1");
 
          if (passwordsMatch) return person;
      }

      return null;
    },
  })],
} satisfies NextAuthConfig;