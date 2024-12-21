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
        //    console.log("credentials", credentials);
        const username = credentials.username as string;
        const password = credentials.password as string;
        // Fetch user data from Drizzle schema
        //    console.log("username + password", username + password);
        try {
          //     console.log("1");
          const the_user = await db.query.actual_users.findFirst({
            where: eq(actual_users.username, username),
          });
          //    console.log("2");

          if (!the_user) {
            //   console.log("3");

            return null;
          }
          const comparison = await bcrypt.compare(password, the_user.password);
          //   console.log("4");

          if (!comparison) {
            //       console.log("5");

            return null;
          }
          return {
            id: the_user.id,
            username: the_user.username,
            email: the_user.email,
            paloki: "the_user.paloki", // Optional additional field
          };
        } catch (error) {
          console.error("Error in TEOS authorize:", error);
          return null;
        }
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
      try {
        //    console.log("jwt", token, user);

        if (user) {
          // Store user data in the token
          token.id = user.id;
          if ("username" in user) {
            token.username = user.username;
          } else {
            // Handle the case where `user` doesn't have a `username` property
            console.warn("User object does not have a `username` property.");
          }
          token.email = user.email; // Add email to the token
          token.paloki = user.paloki;
        }

        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        // Optionally return the token as-is in case of an error
        return token;
      }
    },
    async session({ session, token }) {
      try {
        //  console.log("session", session, token);

        if (token) {
          // Attach user data from token to session
          session.user.id = token.id as string;
          session.user.username = token.username as string;
          session.user.email = token.email!; // Attach email to session
          session.user.paloki = token.paloki as string;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        // Return the session object as-is in case of an error
        return session;
      }
    },
  },
} satisfies NextAuthConfig;
