import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { and, desc, eq, or } from "drizzle-orm";
import {
  deck,
  cronjob_Runs,
  ai_refresh_cronjob_Runs,
  match,
  player,
  actual_users,
  question,
} from "~/server/db/schema";
import axios from "axios";
import { z } from "zod";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const default_situations: string[] = [
  "If a reality TV show host accidentally became the leader of the free world",
  "If your grandmother started a viral OnlyFans account",
  "If the national anthem was replaced with a Nickelback song",
  "If all fast-food chains banned sauces overnight",
  "If billionaires were legally required to work as janitors once a year",
  "In a world where karaoke nights determined the new Supreme Court justices",
  "In a world where pineapple on pizza became mandatory by law",
  "If your worst childhood photo was printed on every cereal box",
  "If Mondays were declared a public holiday, but only for clowns",
  "In a world where pets could post on social media without your permission",
  "If your Wi-Fi password was randomly reset every 30 minutes",
  "In a world where deodorant was banned for environmental reasons",
  "If the Tooth Fairy started leaving IOUs instead of cash",
  "In a world where everyone had to speak in song lyrics for a day",
  "If coffee was outlawed and replaced with kale smoothies",
  "If a typo in the Constitution made TikTok the new national religion",
  "In a world where dentists were allowed to nominate people for jail time",
  "If all emojis were replaced with your ex’s face",
  "In a world where public nudity was encouraged but socks were illegal",
  "If every dog suddenly learned how to file taxes but refused to share how",
];

export const default_questions: string[] = [
  "how would society react to this change?",
  "what would the tabloids write about it?",
  "who would profit the most from this situation?",
  "what would be the weirdest unintended consequence?",
  "how could this be turned into a Netflix original series?",
  "what would Karen think about this?",
  "how would influencers try to monetize it?",
  "what would your weird uncle say about this on Facebook?",
  "what's the most embarrassing way this could escalate?",
  "who would get cancelled over this?",
  "how would the internet collectively lose its mind?",
  "what's the first thing your mom would say about it?",
  "what would be the biggest conspiracy theory surrounding it?",
  "how might this ruin someone’s wedding?",
  "what dumb law would be passed in response to it?",
  "how could someone exploit this for clout?",
  "how would your boss handle it?",
  "what’s the worst possible headline about this?",
  "who would write the ultimate self-help book about it?",
  "how could this lead to the next viral TikTok trend?",
];

const situationExamples = [
  "If your grandmother started a viral OnlyFans account",
  "In a world where pineapple on pizza became mandatory by law",
];
const questionExamples = [
  "what would Karen think about this?",
  "how could this lead to the next viral TikTok trend?",
];

export async function generateAndSeedDeck(
  prompt: string,
  username: string,
  deckname: string,
) {
  const user = await db.query.actual_users.findFirst({
    where: eq(actual_users.username, username),
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (!user.can_create_AI_decks) {
    throw new Error("User is not allowed to create AI decks at this time");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "system",
        content:
          "You are generating Cards Against Humanity style content. " +
          "Return ONLY valid JSON with two arrays: {situations: string[], questions: string[]}. " +
          "Situations MUST start with either 'If' or 'In a world where' and should be absurd, satirical setups. " +
          "Questions should be humorous follow-up prompts that start with 'how', 'what', or 'who' in lowercase. " +
          "Keep the tone consistently irreverent and amusing. " +
          "Ensure situations are complete sentences and questions end with a question mark.",
      },
      {
        role: "user",
        content: `Generate exactly 20 funny situations and 20 funny questions for a deck about: ${prompt}.
                  
Example situations (follow this format):
- If your grandmother started a viral OnlyFans account
- In a world where pineapple on pizza became mandatory by law

Example questions (follow this format):
- what would Karen think about this?
- how could this lead to the next viral TikTok trend?

Match this exact tone and style. Each situation must start with 'If' or 'In a world where'.
Each question must start with 'how', 'what', or 'who' and end with a question mark.
Return only valid JSON.`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.9,
  });

  const gptResponseSchema = z.object({
    situations: z.array(z.string()),
    questions: z.array(z.string()),
  });

  const parsedRaw = gptResponseSchema.parse(
    JSON.parse(response.choices[0]?.message?.content ?? "{}"),
  );

  const parsed = gptResponseSchema.parse(parsedRaw);

  const situations = parsed.situations;
  const questionsArr = parsed.questions;

  const [newDeck] = await db
    .insert(deck)
    .values({
      name: deckname + " (AI Generated)",
      description: prompt,
      author: user.username,
      createdById: user.id,
      isPublic: false,
    })
    .returning();
  if (!newDeck) {
    throw new Error("Failed to create deck");
  }
  const toInsert = [
    ...situations.map((s) => ({
      text: s,
      isSituation: true,
      createdById: user.id,
      deck: newDeck.id,
    })),
    ...questionsArr.map((q) => ({
      text: q,
      isSituation: false,
      createdById: user.id,
      deck: newDeck.id,
    })),
  ];
  const result = await db.insert(question).values(toInsert).returning();
  if (result.length === 0) {
    throw new Error("Failed to insert questions");
  }

  if (newDeck) {
    await db
      .update(actual_users)
      .set({
        can_create_AI_decks: false,
      })
      .where(eq(actual_users.id, user.id));
  }

  return {
    deck: newDeck,
    situations,
    questions: questionsArr,
  };
}

export async function shouldRunJob() {
  const latestRun = await db.query.cronjob_Runs.findFirst({
    columns: { runDate: true },
    orderBy: [desc(cronjob_Runs.runDate)],
  });

  const latest_ai_refresh = await db.query.ai_refresh_cronjob_Runs.findFirst({
    columns: { runDate: true },
    orderBy: [desc(ai_refresh_cronjob_Runs.runDate)],
  });

  if (!latestRun || !latest_ai_refresh) {
    return {
      should_run_Cleaning_cron: true,
      should_run_ai_refresh: true,
    };
  }

  console.log("latestRun", latestRun);
  console.log("latest_ai_refresh", latest_ai_refresh);

  const currentTime = new Date();
  console.log("currentTime", currentTime);

  const lastRunTime = new Date(latestRun.runDate);
  const lastAiRefreshTime = new Date(latest_ai_refresh.runDate);

  const minutesDifference =
    (currentTime.getTime() - lastRunTime.getTime()) / (1000 * 60);

  const aiRefreshMinutesDifference =
    (currentTime.getTime() - lastAiRefreshTime.getTime()) / (1000 * 60);

  const should_run_Cleaning_cron = minutesDifference >= 55;
  const should_run_ai_refresh = aiRefreshMinutesDifference >= 23 * 60 + 50;

  return {
    should_run_Cleaning_cron,
    should_run_ai_refresh,
  };
}

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j]!,
      shuffledArray[i]!,
    ];
  }
  return shuffledArray;
};

export async function get_question_list_ready_for_match(
  id: string,
  userID: string,
) {
  try {
    let situationsToUse: string[] = [];
    let questionsToUse: string[] = [];

    if (id === "default") {
      situationsToUse = default_situations;
      questionsToUse = default_questions;
    } else {
      const exact_deck = await db.query.deck.findFirst({
        where: or(
          and(eq(deck.id, id), eq(deck.createdById, userID)),
          and(eq(deck.id, id), eq(deck.isPublic, true)),
        ),
        with: { questions: true },
      });

      if (!exact_deck) {
        throw new Error(
          "Deck doesn't exist, isn't public, or isn't owned by you.",
        );
      }

      const situations_v0 =
        exact_deck.questions.filter((q) => q.isSituation === true) ?? [];
      const questions_v0 =
        exact_deck.questions.filter((q) => q.isSituation === false) ?? [];

      situationsToUse = situations_v0
        .map((s) => s.text)
        .filter((text): text is string => text !== null);
      questionsToUse = questions_v0
        .map((q) => q.text)
        .filter((text): text is string => text !== null);
    }

    const shuffledSituations = shuffleArray(situationsToUse);
    const shuffledQuestions = shuffleArray(questionsToUse);

    const numberOfPairs = Math.min(
      shuffledSituations.length,
      shuffledQuestions.length,
    );
    const pairs: string[] = [];
    for (let i = 0; i < numberOfPairs; i++) {
      pairs.push(`${shuffledSituations[i]} , ${shuffledQuestions[i]}`);
    }
    return pairs.length > 0 ? pairs : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error in get_question_list_ready_for_match:",
        error.message,
      );
      return null;
    }
    console.error(
      "Unexpected error in get_question_list_ready_for_match:",
      error,
    );
    return null;
  }
}
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function GetPlayerStartedMatches(username: string) {
  const started_matches = await db.query.match.findMany({
    where: and(eq(match.has_started, true)),
    columns: { id: true, name: true },
    with: {
      players: {
        where: eq(player.username, username),
        columns: { username: true },
      },
    },
  });

  return started_matches.filter((match) => match.players.length > 0);
}

export async function GetAllRelevantMatches(username: string) {
  const existing_matches = await db.query.match.findMany({
    columns: { id: true, name: true },
    where: eq(match.has_started, false),
  });

  const joined_started_matches = await GetPlayerStartedMatches(username);

  return [...joined_started_matches, ...existing_matches];
}
