"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Multiversal Mishaps?",
    answer:
      "Multiversal Mishaps is a hilarious party game inspired by Cards Against Humanity with both the tone and ruleset, but with a cosmic twist. Players compete to create the funniest combinations of questions and answers across different universes and dimensions.",
  },
  {
    question: "How many players can play?",
    answer:
      "The game is designed for 3 to 10 players. The more players you have, the more chaotic and fun it becomes!",
  },
  {
    question: "Can I create my own cards?",
    answer:
      "You can create your own custom decks, either private or public, with both question and situation cards. Let your imagination run wild across the multiverse!",
  },
  {
    question: "How long does a typical game last?",
    answer:
      "A typical game lasts about 30-60 minutes, but you can adjust the size of the deck to make games shorter or longer.",
  },
  {
    question: "Is there an age restriction?",
    answer:
      "While the base game is suitable for players 17 and up, you can create family-friendly decks for younger players. Always check the deck content before playing with mixed age groups.",
  },

  {
    question: "What are the Situations in the default deck?",
    answer: `1.\nIf a reality TV show host accidentally became the leader of the free world\n\n
2.\nIf your grandmother started a viral OnlyFans account\n\n
3.\nIf the national anthem was replaced with a Nickelback song\n\n
4.\nIf all fast-food chains banned sauces overnight\n\n
5.\nIf billionaires were legally required to work as janitors once a year\n\n
6.\nIn a world where karaoke nights determined the new Supreme Court justices\n\n
7.\nIn a world where pineapple on pizza became mandatory by law\n\n
8.\nIf your worst childhood photo was printed on every cereal box\n\n
9.\nIf Mondays were declared a public holiday, but only for clowns\n\n
10.\nIn a world where pets could post on social media without your permission\n\n
11.\nIf your Wi-Fi password was randomly reset every 30 minutes\n\n
12.\nIn a world where deodorant was banned for environmental reasons\n\n
13.\nIf the Tooth Fairy started leaving IOUs instead of cash\n\n
14.\nIn a world where everyone had to speak in song lyrics for a day\n\n
15.\nIf coffee was outlawed and replaced with kale smoothies\n\n
16.\nIf a typo in the Constitution made TikTok the new national religion\n\n
17.\nIn a world where dentists were allowed to nominate people for jail time\n\n
18.\nIf all emojis were replaced with your ex’s face\n\n
19.\nIn a world where public nudity was encouraged but socks were illegal\n\n
20.\nIf every dog suddenly learned how to file taxes but refused to share how\n\n`,
  },
  {
    question: "What are the Questions in the default deck?",
    answer: `1.\nHow would society react to this change?\n\n
2.\nWhat would the tabloids write about it?\n\n
3.\nWho would profit the most from this situation?\n\n
4.\nWhat would be the weirdest unintended consequence?\n\n
5.\nHow could this be turned into a Netflix original series?\n\n
6.\nWhat would Karen think about this?\n\n
7.\nHow would influencers try to monetize it?\n\n
8.\nWhat would your weird uncle say about this on Facebook?\n\n
9.\nWhat's the most embarrassing way this could escalate?\n\n
10.\nWho would get cancelled over this?\n\n
11.\nHow would the internet collectively lose its mind?\n\n
12.\nWhat's the first thing your mom would say about it?\n\n
13.\nWhat would be the biggest conspiracy theory surrounding it?\n\n
14.\nHow might this ruin someone’s wedding?\n\n
15.\nWhat dumb law would be passed in response to it?\n\n
16.\nHow could someone exploit this for clout?\n\n
17.\nHow would your boss handle it?\n\n
18.\nWhat’s the worst possible headline about this?\n\n
19.\nWho would write the ultimate self-help book about it?\n\n
20.\nHow could this lead to the next viral TikTok trend?\n\n`,
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
                    {faq.answer}
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
