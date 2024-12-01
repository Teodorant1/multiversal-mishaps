import { eq } from "drizzle-orm";
import { hashPassword, sleep } from "random-functions/backend/backend1";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { actual_users } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
  register: protectedProcedure
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

  //   hello: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),

  //   create: protectedProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       await ctx.db.insert(posts).values({
  //         name: input.name,
  //         createdById: ctx.session.user.id,
  //       });
  //     }),

  //   getLatest: protectedProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });

  //     return post ?? null;
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
