import { authRouter } from "./routers/auth";
import { gameRouter } from "./routers/game";
import { deckRouter } from "./routers/decks";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  deck: deckRouter,
  game: gameRouter,
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
