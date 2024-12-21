"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type Deck, type QuestionType } from "~/types/projecttypes";
import { CosmicButton } from "./CosmicButton";
import { api } from "~/trpc/react";
import {
  type deck_type,
  type question_type,
  type combined_type,
} from "~/server/db/schema";
import { DeckQuestionsList } from "./DeckQuestionsList";
import { ErrorPopup } from "./ErrorPopup";

export default function DeckManagement() {
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [description, setdescription] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("Question");
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [my_selectedDeck, set_my_selectedDeck] = useState<combined_type | null>(
    null,
  );
  const [current_selectedDeck_id, set_current_selectedDeck_id] =
    useState<string>("null");

  const mydecks = api.deck.fetch_my_decks.useQuery();
  const selected_deck = api.deck.get_deck_by_id.useQuery({
    id: current_selectedDeck_id,
  });

  const toggle_deck_visibility = api.deck.toggle_deck_visibility.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);

      if (data.error === false) {
        await mydecks.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_toggle_deck = (id: string) => {
    setIsLoading(true);
    toggle_deck_visibility.mutate({
      id: id,
    });
  };

  const make_deck = api.deck.add_deck.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);

      if (data.error === false) {
        await mydecks.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_make_deck = (isPublic: boolean) => {
    // const is_public = get_is_SITUATION_figured_out(questionType);

    setIsLoading(true);
    make_deck.mutate({
      description: description,
      name: newDeckName,
      isPublic: isPublic,
    });
  };
  const delete_deck = api.deck.delete_deck.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);

      if (data.error === false) {
        await mydecks.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_delete_deck = (id: string) => {
    setIsLoading(true);
    delete_deck.mutate({
      id: id,
    });
  };

  const make_question = api.deck.add_question.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      setNewQuestion("");

      if (data.error === false) {
        await selected_deck.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_make_question = (deck: string) => {
    setIsLoading(true);

    const isSituation = get_is_SITUATION_figured_out(questionType);

    make_question.mutate({
      deck: deck,
      text: newQuestion,
      isSituation: isSituation,
    });
  };

  const delete_question = api.deck.delete_question.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);

      if (data.error === false) {
        await mydecks.refetch();
        await selected_deck.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_delete_question = (id: string) => {
    setIsLoading(true);
    delete_question.mutate({
      id: id,
    });
  };

  function get_is_SITUATION_figured_out(input: string) {
    if (input === "Question") {
      return false;
    }
    if (input === "Situation") {
      return true;
    }
    return false;
  }
  // useEffect(() => {
  //   if (my_selectedDeck) {
  //   }
  // }, [mydecks.data]); // Empty dependency array means this will run once on mount

  // function getDeck_by_id(id: string) {
  //   const deck = mydecks.data?.filter(
  //     (deck) => deck.id === current_selectedDeck_id,
  //   );
  //   return deck?.[0] ?? null; // Return the first matching deck or null if none found
  // }
  // const handleCreateDeck = () => {
  //   if (newDeckName.trim()) {
  //     const newDeck: Deck = {
  //       id: Date.now().toString(),
  //       name: newDeckName.trim(),
  //       questions: [],
  //     };
  //     setDecks([...decks, newDeck]);
  //     setNewDeckName("");
  //   }
  // };

  // const handleAddQuestion = () => {
  //   if (selectedDeck && newQuestion.trim()) {
  //     const updatedDeck = {
  //       ...selectedDeck,
  //       questions: [
  //         ...selectedDeck.questions,
  //         { type: questionType, content: newQuestion.trim() },
  //       ],
  //     };
  //     setDecks(
  //       decks.map((deck) => (deck.id === selectedDeck.id ? updatedDeck : deck)),
  //     );
  //     setSelectedDeck(updatedDeck);
  //     setNewQuestion("");
  //   }
  // };

  return (
    <div className="mx-auto max-w-4xl text-white">
      {isError && (
        <div className="flex w-full items-center justify-center">
          <ErrorPopup message={errorText} onDismiss={() => setIsError(null)} />
        </div>
      )}
      <h1 className="mb-8 text-center text-4xl font-bold">Deck Management</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-2xl font-semibold">Create New Deck</h2>
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="Enter deck name"
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="my-2">
            <CosmicButton
              onClick={() => {
                handle_make_deck(false);
              }}
              text={"Create Private Deck"}
            />
          </div>
          <div className="my-2">
            <CosmicButton
              onClick={() => {
                handle_make_deck(false);
              }}
              text={"Create Public Deck"}
            />
          </div>

          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter deck description"
            className="my-5 mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="Enter deck name"
            className="my-5 mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="Enter deck name"
            className="my-5 mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateDeck}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            Create Deck
          </motion.button> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-2xl font-semibold">Add Question</h2>
          <select
            value={selectedDeck?.id ?? ""}
            onChange={(e) =>
              setSelectedDeck(
                decks.find((deck) => deck.id === e.target.value) ?? null,
              )
            }
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a deck</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Question">Question Card</option>
            <option value="Situation">Situation Card</option>
          </select>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question"
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selected_deck.data && (
            <CosmicButton
              onClick={() => {
                handle_make_question(selected_deck.data!.id);
              }}
              text={"Add Question"}
            />
          )}

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddQuestion}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700"
          >
            Add Question
          </motion.button> */}
        </motion.div>
      </div>
      {mydecks.data && mydecks.data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 rounded-lg bg-gray-800 p-6"
        >
          <>
            <h2 className="mb-4 text-2xl font-semibold">Your Decks</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mydecks.data.map((deck) => (
                <motion.div
                  key={deck.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-md bg-gray-700 p-4"
                  onClick={() => {
                    set_my_selectedDeck(deck);
                  }}
                >
                  <h3 className="mb-2 text-xl font-semibold">{deck.name}</h3>
                  <p>{deck.questions.length} questions</p>
                </motion.div>
              ))}
            </div>
          </>
        </motion.div>
      )}
      {my_selectedDeck && (
        <div className="relative z-10 mt-2">
          <DeckQuestionsList deck={my_selectedDeck} all_questions={[]} />
        </div>
      )}
    </div>
  );
}
