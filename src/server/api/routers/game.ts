import { eq, and } from "drizzle-orm";
import {
  hashPassword,
  get_question_list_ready_for_match,
} from "random-functions/backend/backend1";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { match, player } from "~/server/db/schema";

export const gameRouter = createTRPCRouter({
  start_match: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        // player_username: z.string(),
        match_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existing_match = await ctx.db.query.match.findFirst({
          where: and(
            eq(match.id, input.match_id.trim()),
            eq(match.name, input.match_name.trim()),
            eq(match.password, input.match_password.trim()),
          ),
        });
        if (
          existing_match &&
          existing_match?.creator_owner === ctx.session.user.username
        ) {
          await ctx.db
            .update(match)
            .set({
              has_started: true,
            })
            .where(eq(match.id, existing_match.id));

          return {
            existing_match,
            error: false,
            error_description: null,
          };
        } else {
          throw new Error(
            "The match you are trying to start either doesn't exist OR you aren't the creator_owner of it",
          );

          // return {
          //   existing_match: null,
          //   error: true,
          //   error_description:
          //     "The match you are trying to start either doesn't exist OR you aren't the creator_owner of it",
          // };
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message); // Access safely

          return {
            existing_match: null,
            error: true,
            error_description: error.message,
          };
        }
        console.error("Error in mutation:", error);
        return {
          existing_match: null,
          error: true,
          error_description: "Something went wrong. Please try again.",
        };
      }
    }),

  create_match: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        // player_username: z.string(),
        deck_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const question_list = await get_question_list_ready_for_match(
          input.deck_id.trim(),
          ctx.session.user.id,
        );

        if (!question_list) {
          throw new Error("Cannot create question list for some reason");
          //      return null;
        }
        const first_question = question_list.shift();
        if (!first_question) {
          throw new Error("Cannot create first_question for some reason");
          //      return null;
        }
        const new_match = await ctx.db
          .insert(match)
          .values({
            name: input.match_name.trim(),
            current_judge: ctx.session.user.username,
            creator_owner: ctx.session.user.username,
            password: input.match_password.trim(),
            all_questions: question_list,
            question: first_question,
            deck: input.deck_id.trim(),
            scheduled_for_deletion: false,
          })
          .returning();

        const returned_new_match = new_match.at(0);

        if (!returned_new_match) {
          throw new Error("Couldn't create the match for some weird reason");
        }

        const hashedPassword = await hashPassword(input.player_password.trim());

        const first_player = await ctx.db
          .insert(player)
          .values({
            // username: input.player_username.trim(),
            username: ctx.session.user.username,
            hashed_password: hashedPassword,
            match: returned_new_match?.id,
          })
          .returning();

        return {
          returned_new_match,
          first_player: first_player.at(0),
          error: false,
          error_description: null,
        };
      } catch (error) {
        console.error("Error in mutation:", error);
        if (error instanceof Error) {
          console.log(error.message); // Access safely
          return {
            returned_new_match: null,
            first_player: null,
            error: true,
            error_description: error.message,
          };
        }
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
          first_player: null,
          returned_new_match: null,
        };
      }
    }),
  join_match: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        // player_username: z.string(),
        match_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existing_match = await ctx.db.query.match.findFirst({
          where: and(
            eq(match.id, input.match_id.trim()),
            eq(match.password, input.match_password.trim()),
          ),
          with: { players: true },
        });
        if (existing_match) {
          const this_player = existing_match.players.find(
            // (player) => player.username === input.player_username.trim(),

            (player) => player.username === ctx.session.user.username.trim(),
          );

          if (this_player) {
            const comparison = await bcrypt.compare(
              input.player_password,
              this_player?.hashed_password,
            );
            if (comparison) {
              return {
                existing_match,
                first_player: this_player,
                error: false,
                error_description: null,
              };
            } else if (!comparison) {
              throw new Error("Wrong Credentials");
            }
          } else if (!this_player) {
            throw new Error("User Doesn't exist");
          }
          const hashedPassword = await hashPassword(
            input.player_password.trim(),
          );

          const new_player = await ctx.db
            .insert(player)
            .values({
              // username: input.player_username.trim(),
              username: ctx.session.user.username.trim(),
              hashed_password: hashedPassword,
              match: existing_match.id,
            })
            .returning();

          const actual_player = new_player.at(0);
          existing_match.players = [];
          return {
            existing_match,
            this_player: actual_player,
            error: false,
            error_description: null,
          };
        } else {
          throw new Error("Match doesn't exist");
        }
      } catch (error) {
        console.error("Error in mutation:", error);
        if (error instanceof Error) {
          console.log(error.message); // Access safely

          return {
            existing_match: null,
            this_player: null,
            error: true,
            error_description: error.message,
          };
        }
        return {
          existing_match: null,
          this_player: null,
          error: true,
          error_description: "Something went wrong. Please try again.",
        };
      }
    }),
  answer: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        // player_username: z.string(),
        match_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existing_match = await ctx.db.query.match.findFirst({
          where: and(
            eq(match.id, input.match_id.trim()),
            eq(match.name, input.match_name.trim()),
            eq(match.password, input.match_password.trim()),
          ),
          with: { players: true },
        });
        if (existing_match) {
          const this_player = existing_match.players.find(
            //            (player) => player.username === input.player_username.trim(),
            (player) => player.username === ctx.session.user.username,
          );
          if (this_player) {
            const comparison = await bcrypt.compare(
              input.player_password,
              this_player?.hashed_password,
            );
            if (comparison) {
              existing_match.players = [];

              await ctx.db
                .update(player)
                .set({ answer: input.answer })
                .where(
                  and(
                    eq(player.match, input.match_id.trim()),
                    eq(player.username, ctx.session.user.username.trim()),
                    eq(player.id, this_player.id.trim()),
                    eq(
                      player.hashed_password,
                      this_player.hashed_password.trim(),
                    ),
                  ),
                );

              return {
                error: false,
                error_description: null,
              };
            } else {
              return null;
            }
          }

          return {
            error: false,
            error_description: null,
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error in mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
        };
      }
    }),
  judge_vote_for: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        target_id: z.string(),
        match_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const existing_match = await ctx.db.query.match.findFirst({
          where: and(
            eq(match.id, input.match_id.trim()),
            eq(match.password, input.match_password.trim()),
            eq(match.name, input.match_name.trim()),
          ),
          with: { players: true },
        });
        if (existing_match) {
          const this_player = existing_match.players.find(
            (player) => player.username === ctx.session.user.username.trim(),
          );

          const target_player = existing_match.players.find(
            (player) => player.id === input.target_id.trim(),
          );

          if (
            this_player?.username === existing_match.current_judge &&
            target_player
          ) {
            const comparison = await bcrypt.compare(
              input.player_password,
              this_player?.hashed_password,
            );
            if (comparison) {
              await ctx.db
                .update(player)
                .set({
                  score: target_player.score + 1,
                })
                .where(eq(player.id, target_player.id));

              await ctx.db
                .update(player)
                .set({
                  answer: "",
                })
                .where(eq(player.match, target_player.match));

              const new_question = existing_match.all_questions.shift();
              if (new_question) {
                await ctx.db
                  .update(match)
                  .set({
                    question: new_question,
                    all_questions: existing_match.all_questions,
                    current_judge: target_player.username,
                  })
                  .where(eq(match.id, existing_match.id));
              } else if (!new_question) {
                throw new Error(
                  "Can't create new question , most likely since there aren't any remaining questions",
                );
              }

              return {
                error: false,
                error_description: null,
              };
            } else {
              throw new Error("Wrong password");
            }
          } else {
            throw new Error("You aint a judge buddy");
          }
        } else {
          throw new Error("Match doesn't exist");
        }
      } catch (error) {
        console.error("Error in mutation:", error);
        return {
          error: true,
          error_description: "Something went wrong. Please try again.",
        };
      }
    }),
  get_data_on_match: protectedProcedure
    .input(
      z.object({
        match_name: z.string(),
        match_id: z.string(),
        match_password: z.string(),
        player_password: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const new_date = new Date();
      console.log(new_date);

      console.log("getting data for get_data_on_match PROCEDURE ");
      const existing_match = await ctx.db.query.match.findFirst({
        where: and(
          eq(match.id, input.match_id.trim()),
          eq(match.password, input.match_password.trim()),
          eq(match.name, input.match_name.trim()),
        ),
        with: { players: true },
      });
      if (!existing_match?.players) {
        return null;
      }
      for (let i = 0; i < existing_match?.players.length; i++) {
        existing_match.players[i]!.hashed_password = "hashedpassword";
      }
      console.log("existing_match", existing_match);
      return existing_match;
    }),
  get_available_matches: protectedProcedure.query(async ({ ctx }) => {
    const existing_matches = await ctx.db.query.match.findMany({
      columns: { id: true, name: true },
      where: and(eq(match.has_started, false)),
    });

    return existing_matches;
  }),
});
