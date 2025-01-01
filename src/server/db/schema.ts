import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name) => `multiversal-mishaps_${name}`,
);
export const question_type = pgEnum("question_type", ["question", "situation"]);

export const cronjob_Runs = createTable("cronjob_Runs", {
  runDate: timestamp("runDate", { withTimezone: true }).primaryKey().notNull(),
});

export const deck = createTable("deck", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 2000 }).notNull(),
  description: varchar("description", { length: 2000 }).notNull(),
  author: varchar("author", { length: 255 })
    .notNull()
    .references(() => actual_users.username, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => actual_users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  isPublic: boolean("isPublic").default(false),
});

export const question = createTable("question", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: varchar("text", { length: 1500 }),
  isSituation: boolean("isSituation").notNull(),
  createdById: varchar("createdById", { length: 255 })
    .notNull()
    .references(() => actual_users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  deck: varchar("deck", { length: 255 })
    .notNull()
    .references(() => deck.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const actual_users = createTable("actual_users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),

  image: varchar("image", { length: 255 }),
});

export const match = createTable("match", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  current_judge: varchar("current_judge", { length: 255 })
    .notNull()
    .default(""),
  creator_owner: varchar("creator_owner", { length: 255 })
    .notNull()
    .default(""),
  password: varchar("password", { length: 255 }),
  all_questions: varchar("all_questions", { length: 3000 })
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  question: varchar("question", { length: 3000 }).notNull(),
  deck: varchar("deck", { length: 255 }).notNull(),
  scheduled_for_deletion: boolean("scheduled_for_deletion").default(false),
  has_started: boolean("has_started").default(false),
});

export const player = createTable("player", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: varchar("username", { length: 255 })
    .notNull()
    .references(() => actual_users.username, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  hashed_password: varchar("hashed_password", { length: 255 }).notNull(),
  score: integer("score").default(0).notNull(),
  answer: varchar("answer", { length: 255 }).default(""),
  match: varchar("match", { length: 255 })
    .notNull()
    .references(() => match.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
export const matchRelations = relations(match, ({ many }) => ({
  players: many(player),
}));

export const playerRelations = relations(player, ({ one }) => ({
  match: one(match, {
    fields: [player.match],
    references: [match.id],
  }),
}));
export const deckRelations = relations(deck, ({ many }) => ({
  questions: many(question),
}));

export const questionRelations = relations(question, ({ one }) => ({
  deck: one(deck, {
    fields: [question.deck],
    references: [deck.id],
  }),
}));

export type deck_type = typeof deck.$inferInsert;
export type question_type = typeof question.$inferInsert;
export type combined_type = deck_type & { questions: question_type[] };
export type match_type = typeof match.$inferSelect;
