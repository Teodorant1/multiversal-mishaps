import { eq } from "drizzle-orm";
import { hashPassword, sleep } from "random-functions/backend/backend1";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { actual_users } from "~/server/db/schema";

export const gameRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("a1");

      try {
        console.log("b1");

        const existing_user = await ctx.db.query.actual_users.findFirst({
          where: eq(actual_users.email, input.email),
        });
        console.log("c1");

        if (existing_user) {
          console.log("d1");

          return {
            error: true,
            error_description:
              "Email or username is taken, please pick something else.",
            user: null,
          };
        }
        console.log("e1");

        const hashedPassword = await hashPassword(input.password);
        console.log("f1");

        const user = await ctx.db
          .insert(actual_users)
          .values({
            username: input.username,
            email: input.email,
            password: hashedPassword,
          })
          .returning();
        console.log("g1");

        await sleep(10);

        return {
          user,
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.log("q1");

        console.error("Error in register mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
});
