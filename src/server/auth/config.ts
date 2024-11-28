// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "../db";
import { eq } from "drizzle-orm";
import {
  actual_users,
  // accounts,
  // sessions,
  // users,
  // verificationTokens,
} from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      email: string;
      paloki?: string;
    } & DefaultSession["user"];
  }

  interface User {
    paloki?: string;
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 2592000, // 30 days
    updateAge: 86400, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const username = credentials.username as string;
        const password = credentials.password as string;
        // Fetch user data from Drizzle schema

        const the_user = await db.query.actual_users.findFirst({
          where: eq(actual_users.username, username),
        });
        if (the_user) {
          const comparison = await bcrypt.compare(password, the_user.password);

          if (!the_user || !comparison) {
            return null;
          }

          // Return user session data with email
          return {
            id: the_user.id,
            username: the_user.username,
            email: the_user.email, // Include email in the session
            paloki: "the_user.paloki", // Optional additional field
          };
        }

        return null;
      },
    }),
  ],
  // adapter: DrizzleAdapter(db, {
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store user data in the token
        token.id = user.id;
        if ("username" in user) {
          token.username = user.username;
        } else {
          // Handle the case where `user` doesn't have a `username` property
        }
        token.email = user.email; // Add email to the token
        token.paloki = user.paloki;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Attach user data from token to session
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email!; // Attach email to session
        session.user.paloki = token.paloki as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
