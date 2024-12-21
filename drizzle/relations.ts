import { relations } from "drizzle-orm/relations";
import { multiversalMishapsActualUsers, multiversalMishapsDeck, multiversalMishapsMatch, multiversalMishapsPlayer, multiversalMishapsQuestion } from "./schema";

export const multiversalMishapsDeckRelations = relations(multiversalMishapsDeck, ({one, many}) => ({
	multiversalMishapsActualUser: one(multiversalMishapsActualUsers, {
		fields: [multiversalMishapsDeck.createdBy],
		references: [multiversalMishapsActualUsers.username]
	}),
	multiversalMishapsMatches: many(multiversalMishapsMatch),
	multiversalMishapsQuestions: many(multiversalMishapsQuestion),
}));

export const multiversalMishapsActualUsersRelations = relations(multiversalMishapsActualUsers, ({many}) => ({
	multiversalMishapsDecks: many(multiversalMishapsDeck),
	multiversalMishapsQuestions: many(multiversalMishapsQuestion),
}));

export const multiversalMishapsMatchRelations = relations(multiversalMishapsMatch, ({one, many}) => ({
	multiversalMishapsDeck: one(multiversalMishapsDeck, {
		fields: [multiversalMishapsMatch.deck],
		references: [multiversalMishapsDeck.id]
	}),
	multiversalMishapsPlayers: many(multiversalMishapsPlayer),
}));

export const multiversalMishapsPlayerRelations = relations(multiversalMishapsPlayer, ({one}) => ({
	multiversalMishapsMatch: one(multiversalMishapsMatch, {
		fields: [multiversalMishapsPlayer.match],
		references: [multiversalMishapsMatch.id]
	}),
}));

export const multiversalMishapsQuestionRelations = relations(multiversalMishapsQuestion, ({one}) => ({
	multiversalMishapsActualUser: one(multiversalMishapsActualUsers, {
		fields: [multiversalMishapsQuestion.createdBy],
		references: [multiversalMishapsActualUsers.id]
	}),
	multiversalMishapsDeck: one(multiversalMishapsDeck, {
		fields: [multiversalMishapsQuestion.deck],
		references: [multiversalMishapsDeck.id]
	}),
}));