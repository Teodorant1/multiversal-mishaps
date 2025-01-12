import { and, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { deck, question } from "~/server/db/schema";

export const deckRouter = createTRPCRouter({
  toggle_deck_visibility: protectedProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const original_deck = await ctx.db.query.deck.findFirst({
          where: and(
            eq(deck.id, input.id),
            eq(deck.createdById, ctx.session.user.id),
          ),
        });
        if (original_deck) {
          const toggled_deck = await ctx.db
            .update(deck)
            .set({
              isPublic: !original_deck.isPublic,
              updatedAt: new Date(),
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
        }
        return {
          toggled_deck: null,
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
    return my_decks ?? [];
  }),
  fetch_public_decks: publicProcedure
    .input(
      z.object({
        from: z.date(),
        to: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log("input", input);
      if (input.from && input.to) {
        const public_decks = await ctx.db.query.deck.findMany({
          where: and(
            eq(deck.isPublic, true),
            gte(deck.updatedAt, input.from),
            lte(deck.updatedAt, input.to),
          ),
          with: { questions: true },
        });
        console.log("public_decks", public_decks);

        return public_decks;
      }
      return [];
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
  get_public_deck_by_id: publicProcedure
    .input(
      z.object({
        id: z.string().max(255, "id must be at most 255 characters"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const exact_deck = await ctx.db.query.deck.findFirst({
        where: and(eq(deck.id, input.id), eq(deck.isPublic, true)),
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
        await ctx.db
          .update(deck)
          .set({
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(deck.id, input.deck),
              eq(deck.createdById, ctx.session.user.id),
            ),
          );
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
});
