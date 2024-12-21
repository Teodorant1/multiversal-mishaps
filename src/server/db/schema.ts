import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  // index,
  // integer,
  pgEnum,
  pgTableCreator,
  // primaryKey,
  // text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
// import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `multiversal-mishaps_${name}`,
);
export const question_type = pgEnum("question_type", ["question", "situation"]);

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
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  isPublic: boolean("isPublic").default(false),
});

export type deck_type = typeof deck.$inferInsert;
export type question_type = typeof question.$inferInsert;
export type combined_type = deck_type & { questions: question_type[] };

export const question = createTable("question", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: varchar("text", { length: 2000 }),
  // question_type: question_type("question_type").notNull(),
  isSituation: boolean("isSituation").notNull(),
  createdById: varchar("created_by", { length: 255 })
    .notNull()
    .references(() => actual_users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  deck: varchar("deck", { length: 255 })
    .notNull()
    .references(() => deck.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
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
  password: varchar("password", { length: 255 }).notNull(), // New password field

  image: varchar("image", { length: 255 }),
});

export const match = createTable("match", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).unique(),
  current_judge: varchar("name", { length: 255 }),
  password: varchar("password", { length: 255 }), // New password field
  // hold all of the questions in one array
  all_questions: varchar("all_questions", { length: 2000 })
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),

  question: varchar("question", { length: 2000 }).notNull(), // New password field
  deck: varchar("deck", { length: 255 })
    .notNull()
    .references(() => deck.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const player = createTable("player", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("username", { length: 255 }).notNull(),
  hashed_password: varchar("hashed_password", { length: 255 }).notNull(), // New password field
  score: integer("score").default(0), // New password field
  answer: varchar("answer", { length: 255 }).default(""), // New password field
  match: varchar("match", { length: 255 })
    .notNull()
    .references(() => match.id, { onDelete: "cascade", onUpdate: "cascade" }),
});
// Define the relations between the match and player tables
export const matchRelations = relations(match, ({ many }) => ({
  players: many(player), // A match can have many players
}));

export const playerRelations = relations(player, ({ one }) => ({
  match: one(match, {
    fields: [player.match],
    references: [match.id],
  }), // A player belongs to one match
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

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const posts = createTable(
//   "post",
//   {
//     id: varchar("id", { length: 255 })
//       .notNull()
//       .primaryKey()
//       .$defaultFn(() => crypto.randomUUID()),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 })
//     .notNull()
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   username: varchar("username", { length: 255 }),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   password: varchar("password", { length: 255 }).notNull(), // New password field

//   emailVerified: timestamp("email_verified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("provider_account_id", {
//       length: 255,
//     }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_user_id_idx").on(account.userId),
//   }),
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_user_id_idx").on(session.userId),
//   }),
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verification_token",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   }),
// );
