import { eq } from "drizzle-orm";
import { hashPassword, sleep } from "random-functions/backend/backend1";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { actual_users } from "~/server/db/schema";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existing_user = await ctx.db.query.actual_users.findFirst({
          where: eq(actual_users.email, input.email),
        });

        if (existing_user) {
          return {
            error: true,
            error_description:
              "Email or username is taken, please pick something else.",
            user: null,
          };
        }

        const hashedPassword = await hashPassword(input.password);

        const user = await ctx.db
          .insert(actual_users)
          .values({
            username: input.username,
            email: input.email,
            password: hashedPassword,
          })
          .returning();

        await sleep(1);

        return {
          user,
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in register mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
});
