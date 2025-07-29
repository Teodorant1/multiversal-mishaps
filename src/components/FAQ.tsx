"use client";
export const dynamic = "force-static";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Multiversal Mishaps?",
    answer: [
      "Multiversal Mishaps is a hilarious party game inspired by Cards Against Humanity with both the tone and ruleset, but with a cosmic twist.",
      "Players compete to create the funniest combinations of questions and answers across different universes and dimensions.",
    ],
  },
  {
    question: "How many players can play?",
    answer: [
      "The game is designed for 3 to 10 players.",
      "The more players you have, the more chaotic and fun it becomes!",
    ],
  },
  {
    question: "Can I create my own cards?",
    answer: [
      "You can create your own custom decks, either private or public, with both question and situation cards.",
      "Let your imagination run wild across the multiverse!",
    ],
  },
  {
    question: "How long does a typical game last?",
    answer: [
      "A typical game lasts about 30-60 minutes.",
      "You can adjust the size of the deck to make games shorter or longer.",
    ],
  },
  {
    question: "Is there an age restriction?",
    answer: [
      "While the base game is suitable for players 17 and up, you can create family-friendly decks for younger players.",
      "Always check the deck content before playing with mixed age groups.",
    ],
  },
  {
    question: "What are the Situations in the default deck?",
    answer: [
      "1. If a reality TV show host accidentally became the leader of the free world",
      "2. If your grandmother started a viral OnlyFans account",
      "3. If the national anthem was replaced with a Nickelback song",
      "4. If all fast-food chains banned sauces overnight",
      "5. If billionaires were legally required to work as janitors once a year",
      "6. In a world where karaoke nights determined the new Supreme Court justices",
      "7. In a world where pineapple on pizza became mandatory by law",
      "8. If your worst childhood photo was printed on every cereal box",
      "9. If Mondays were declared a public holiday, but only for clowns",
      "10. In a world where pets could post on social media without your permission",
      "11. If your Wi-Fi password was randomly reset every 30 minutes",
      "12. In a world where deodorant was banned for environmental reasons",
      "13. If the Tooth Fairy started leaving IOUs instead of cash",
      "14. In a world where everyone had to speak in song lyrics for a day",
      "15. If coffee was outlawed and replaced with kale smoothies",
      "16. If a typo in the Constitution made TikTok the new national religion",
      "17. In a world where dentists were allowed to nominate people for jail time",
      "18. If all emojis were replaced with your ex’s face",
      "19. In a world where public nudity was encouraged but socks were illegal",
      "20. If every dog suddenly learned how to file taxes but refused to share how",
    ],
  },
  {
    question: "What are the Questions in the default deck?",
    answer: [
      "1. How would society react to this change?",
      "2. What would the tabloids write about it?",
      "3. Who would profit the most from this situation?",
      "4. What would be the weirdest unintended consequence?",
      "5. How could this be turned into a Netflix original series?",
      "6. What would Karen think about this?",
      "7. How would influencers try to monetize it?",
      "8. What would your weird uncle say about this on Facebook?",
      "9. What's the most embarrassing way this could escalate?",
      "10. Who would get cancelled over this?",
      "11. How would the internet collectively lose its mind?",
      "12. What's the first thing your mom would say about it?",
      "13. What would be the biggest conspiracy theory surrounding it?",
      "14. How might this ruin someone’s wedding?",
      "15. What dumb law would be passed in response to it?",
      "16. How could someone exploit this for clout?",
      "17. How would your boss handle it?",
      "18. What’s the worst possible headline about this?",
      "19. Who would write the ultimate self-help book about it?",
      "20. How could this lead to the next viral TikTok trend?",
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Frequently Asked Questions
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.button
              className="w-full rounded-lg bg-gradient-to-r from-purple-800 to-blue-800 p-4 text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold">{faq.question}</span>
              <motion.span
                className="float-right"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 rounded-b-lg bg-gradient-to-r from-blue-900 to-purple-900 p-4"
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-200"
                  >
                    {faq.answer.map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
