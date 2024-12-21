import { pgTable, unique, varchar, foreignKey, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const questionType = pgEnum("question_type", ['question', 'situation'])



export const multiversalMishapsActualUsers = pgTable("multiversal-mishaps_actual_users", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		multiversalMishapsActualUsersUsernameUnique: unique("multiversal-mishaps_actual_users_username_unique").on(table.username),
		multiversalMishapsActualUsersEmailUnique: unique("multiversal-mishaps_actual_users_email_unique").on(table.email),
	}
});

export const multiversalMishapsDeck = pgTable("multiversal-mishaps_deck", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 2000 }).notNull(),
	description: varchar("description", { length: 2000 }).notNull(),
	createdBy: varchar("created_by", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	isPublic: boolean("isPublic").default(false),
},
(table) => {
	return {
		multiversalMishapsDeckCreatedByMultiversalMishapsActual: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [multiversalMishapsActualUsers.username],
			name: "multiversal-mishaps_deck_created_by_multiversal-mishaps_actual_"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const multiversalMishapsMatch = pgTable("multiversal-mishaps_match", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	password: varchar("password", { length: 255 }),
	allQuestions: varchar("all_questions", { length: 2000 }).array().default([""]).notNull(),
	question: varchar("question", { length: 2000 }).notNull(),
	deck: varchar("deck", { length: 255 }).notNull(),
},
(table) => {
	return {
		multiversalMishapsMatchDeckMultiversalMishapsDeckIdFk: foreignKey({
			columns: [table.deck],
			foreignColumns: [multiversalMishapsDeck.id],
			name: "multiversal-mishaps_match_deck_multiversal-mishaps_deck_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		multiversalMishapsMatchNameUnique: unique("multiversal-mishaps_match_name_unique").on(table.name),
	}
});

export const multiversalMishapsPlayer = pgTable("multiversal-mishaps_player", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
	score: integer("score").default(0),
	answer: varchar("answer", { length: 255 }).default(''),
	match: varchar("match", { length: 255 }).notNull(),
},
(table) => {
	return {
		multiversalMishapsPlayerMatchMultiversalMishapsMatchIdF: foreignKey({
			columns: [table.match],
			foreignColumns: [multiversalMishapsMatch.id],
			name: "multiversal-mishaps_player_match_multiversal-mishaps_match_id_f"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const multiversalMishapsQuestion = pgTable("multiversal-mishaps_question", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	text: varchar("text", { length: 2000 }),
	isSituation: boolean("isSituation").notNull(),
	createdBy: varchar("created_by", { length: 255 }).notNull(),
	deck: varchar("deck", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		multiversalMishapsQuestionCreatedByMultiversalMishapsAct: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [multiversalMishapsActualUsers.id],
			name: "multiversal-mishaps_question_created_by_multiversal-mishaps_act"
		}).onUpdate("cascade").onDelete("cascade"),
		multiversalMishapsQuestionDeckMultiversalMishapsDeckIdF: foreignKey({
			columns: [table.deck],
			foreignColumns: [multiversalMishapsDeck.id],
			name: "multiversal-mishaps_question_deck_multiversal-mishaps_deck_id_f"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});