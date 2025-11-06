import { eq } from "drizzle-orm";
import { hashPassword, sleep } from "random-functions/backend/backend1";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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
          where: eq(actual_users.email, input.email.trim()),
        });

        if (existing_user) {
          return {
            error: true,
            error_description:
              "Email or username is taken, please pick something else.",
            user: null,
          };
        }

        const hashedPassword = await hashPassword(input.password.trim());

        const user = await ctx.db
          .insert(actual_users)
          .values({
            username: input.username.trim(),
            email: input.email.trim(),
            password: hashedPassword.trim(),
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
        if (error instanceof Error) {
          console.log(error.message);
          return {
            error: true,
            error_description: error.message,
            user: null,
          };
        }
        return {
          error: true,
          error_description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
  get_AI_deck_ability_status: protectedProcedure.query(async ({ ctx }) => {
    const status = await ctx.db.query.actual_users.findFirst({
      where: eq(actual_users.id, ctx.session.user.id),
      columns: { can_create_AI_decks: true },
    });
    return status?.can_create_AI_decks ?? false;
  }),

  tester_func1: protectedProcedure
    .input(
      z.object({
        username: z.string().min(10),
        number: z.number().min(10),
      }),
    )
    .query(async ({ ctx }) => {
      const status = await ctx.db.query.actual_users.findFirst({
        where: eq(actual_users.id, ctx.session.user.id),
        columns: { can_create_AI_decks: true },
      });
      return status?.can_create_AI_decks ?? false;
    }),
  tester_func2: protectedProcedure
    .input(
      z.object({
        username: z.string().min(10),
        number: z.number().min(10),
      }),
    )
    .mutation(async ({ ctx }) => {
      const status = await ctx.db.query.actual_users.findFirst({
        where: eq(actual_users.id, ctx.session.user.id),
        columns: { can_create_AI_decks: true },
      });
      return status?.can_create_AI_decks ?? false;
    }),
});
