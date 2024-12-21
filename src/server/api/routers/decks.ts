import { and, eq } from "drizzle-orm";
import {
  hashPassword,
  questions,
  sleep,
} from "random-functions/backend/backend1";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { actual_users, deck, question } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
  toggle_deck_visibility: protectedProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const toggled_deck = await ctx.db
          .update(deck)
          .set({
            isPublic: !deck.isPublic,
          })
          .where(
            and(
              eq(deck.id, input.id),
              eq(deck.createdById, ctx.session.user.id),
            ),
          )
          .returning();

        return {
          toggled_deck: toggled_deck.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in deleting question mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),

  fetch_my_decks: protectedProcedure.query(async ({ ctx }) => {
    const my_decks = await ctx.db.query.deck.findMany({
      where: eq(deck.createdById, ctx.session.user.id),
      with: { questions: true },
    });

    console.log("mydecks", my_decks);

    return my_decks ?? [];
  }),
  fetch_public_decks: publicProcedure.query(async ({ ctx }) => {
    const my_decks = await ctx.db.query.deck.findMany({
      where: and(eq(deck.isPublic, true), eq(deck.isPublic, !false)),
      with: { questions: true },
    });
    return my_decks;
  }),

  get_deck_by_id: protectedProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const exact_deck = await ctx.db.query.deck.findFirst({
        where: and(
          eq(deck.id, input.id),
          eq(deck.createdById, ctx.session.user.id),
        ),
        with: { questions: true },
      });
      return exact_deck ?? null;
    }),
  add_question: protectedProcedure
    .input(
      z.object({
        text: z
          .string()
          .max(2000, "text must be at most 2000 characters")
          .min(2, "text must be at least 2 characters"),
        deck: z.string().max(255, "deck must be at most 255 characters"),
        isSituation: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const inserted_question = await ctx.db
          .insert(question)
          .values({
            text: input.text,
            deck: input.deck,
            isSituation: input.isSituation,
            createdById: ctx.session.user.id,
          })
          .returning();

        return {
          inserted_question: inserted_question.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in adding question mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
  delete_question: protectedProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deleted_question = await ctx.db
          .delete(question)
          .where(eq(question.id, input.id))
          .returning();

        return {
          deleted_question: deleted_question.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in deleting question mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
  add_deck: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .max(2000, "Name must be at most 2000 characters")
          .min(2, "text must be at least 2 characters"),
        description: z
          .string()
          .max(2000, "Description must be at most 2000 characters"),
        isPublic: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const new_deck = await ctx.db
          .insert(deck)
          .values({
            name: input.name,
            description: input.description,
            isPublic: input.isPublic,
            author: ctx.session.user.username,
            createdById: ctx.session.user.id,
          })
          .returning();

        return {
          new_deck: new_deck.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in adding deck mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
  delete_deck: protectedProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deleted_deck = await ctx.db
          .delete(deck)
          .where(eq(deck.id, input.id))
          .returning();

        return {
          deleted_deck: deleted_deck.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in deleting deck mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          user: null,
        };
      }
    }),
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
