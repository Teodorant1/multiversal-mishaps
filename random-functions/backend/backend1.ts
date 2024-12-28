import bcrypt from "bcrypt";
import { db } from "~/server/db";
import { and, eq, gte, lte } from "drizzle-orm";
import { deck, type question_type } from "~/server/db/schema";

// Situation parts
export const situations: string[] = [
  "If a galactic council accidentally voted to outlaw gravity",
  "If your spaceship's AI developed an existential crisis",
  "If a rogue scientist turned half the planet into tapioca pudding",
  "If the interdimensional cable network aired your most embarrassing moment",
  "If a black hole suddenly decided to become sentient",
  "In a world where the moon got an unsolicited rebranding by a cosmic marketing agency",
  "In a world where aliens landed on Earth, demanding the recipe for lasagna",
  "If your parallel universe doppelgänger became a celebrity influencer",
  "If time itself took a day off and caused utter chaos",
  "In a world where a hyper-intelligent toaster claimed dominion over all small appliances",
  "If a wormhole appeared in your backyard, leading to a dimension of bad puns",
  "In a world where the president of Mars declared war on improperly made pancakes",
  "If a malfunctioning teleportation device fused two very incompatible objects",
  "In a world where the space station vending machine achieved self-awareness",
  "If an asteroid composed entirely of rubber ducks was discovered",
  "In a world where a mad scientist unleashed an army of quantum cats",
  "If the galactic internet crashed due to an overload of cat memes",
  "In a world where a time-traveling sandwich threatened the space-time continuum",
  "If your robot assistant joined an underground robot rebellion",
  "In a world where a comet began broadcasting reality TV shows from another galaxy",
];

// Question parts
export const questions: string[] = [
  "how would society adapt to this change?",
  "what would the media say about it?",
  "how would scientists explain it?",
  "who or what might benefit from this situation?",
  "what could possibly be the next step?",
  "how would humanity solve the problem?",
  "how might future historians describe this event?",
  "what absurd solution might actually work?",
  "who would be the unlikely hero of this story?",
  "how would intergalactic politics handle it?",
  "what would become the most pressing issue?",
  "what strange innovations might this inspire?",
  "how would the internet react?",
  "what would conspiracy theorists say about it?",
  "how might this affect everyday life?",
  "what would the aliens think of us?",
  "how could this be turned into a blockbuster movie?",
  "who might write the ultimate guide to surviving this?",
  "how could this escalate even further?",
  "what lessons might humanity learn from this?",
];
const shuffleArray = (array: question_type[]): question_type[] => {
  const shuffledArray = [...array]; // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j]!,
      shuffledArray[i]!,
    ]; // Swap elements
  }
  return shuffledArray;
};

export async function get_question_list_ready_for_match(
  id: string,
  userID: string,
) {
  const exact_deck = await db.query.deck.findFirst({
    where: and(eq(deck.id, id), eq(deck.createdById, userID)),
    with: { questions: true },
  });

  const situations_v0 =
    exact_deck?.questions.filter((q) => q.isSituation === true) ?? [];
  const questions_v0 =
    exact_deck?.questions.filter((q) => q.isSituation === false) ?? [];

  // Function to shuffle an array

  // Shuffle both situations and questions
  const situations = shuffleArray(situations_v0);
  const questions = shuffleArray(questions_v0);

  // Determine the number of pairs based on the smaller array's length
  const numberOfPairs = Math.min(situations.length, questions.length);

  // Combine them into pairs
  const pairs: string[] = [];
  for (let i = 0; i < numberOfPairs; i++) {
    pairs.push(`${situations[i]?.text} , ${questions[i]?.text}`);
  }

  return pairs.length > 0 ? pairs : null;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Adjust salt rounds as needed (default is 10)

  // Generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// // Function to shuffle an array
// function shuffleArray<T>(array: T[]): T[] {
//   if (array.length > 0) {
//     const shuffled = [...array]; // Create a copy of the array to avoid mutating the original
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]; // Swap elements
//     }
//     return shuffled;
//   }
//   return [];
// }

// // Function to shuffle and return both arrays
// function getShuffledContent() {
//   const shuffledSituations = shuffleArray(situations);
//   const shuffledQuestions = shuffleArray(questions);
//   return { shuffledSituations, shuffledQuestions };
// }
