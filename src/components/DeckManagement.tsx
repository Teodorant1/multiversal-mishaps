"use client";
export const dynamic = "force-static";
import { useState } from "react";
import { motion } from "framer-motion";
import { type QuestionType } from "~/types/projecttypes";
import { CosmicButton } from "./CosmicButton";
import { api } from "~/trpc/react";
import { DeckQuestionsList } from "./DeckQuestionsList";
import { ErrorPopup } from "./ErrorPopup";
import { useSession } from "next-auth/react";

export default function DeckManagement() {
  const { data: session } = useSession();
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ShowDecks, setShowDecks] = useState(true);

  const [deckToDelete, setDeckToDelete] = useState<string | null>(null);
  const [typedName, setTypedName] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [description, setdescription] = useState("");
  const [ai_deck_prompt, set_ai_deck_prompt] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("Question");
  const [current_selectedDeck_id, set_current_selectedDeck_id] =
    useState<string>("null");

  const can_use_ai_decks = api.auth.get_AI_deck_ability_status.useQuery();
  const mydecks = api.deck.fetch_my_decks.useQuery();
  const selected_deck = api.deck.get_deck_by_id.useQuery({
    id: current_selectedDeck_id,
  });
  function isNameMatched(deckname: string) {
    return deckname === typedName;
  }
  function Toggle_Show_decks() {
    setShowDecks(!ShowDecks);
  }

  const toggle_deck_visibility = api.deck.toggle_deck_visibility.useMutation({
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
  const handle_toggle_deck = (id: string) => {
    setIsLoading(true);
    toggle_deck_visibility.mutate({
      id: id,
    });
  };
  const ai_make_deck = api.deck.generate_private_ai_deck.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);

      if (data.error === false) {
        set_ai_deck_prompt("");
        await mydecks.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });
  const handle_ai_make_deck = () => {
    if (ai_deck_prompt.length < 10 || ai_deck_prompt.length > 1000) {
      setIsError(true);
      setErrorText("AI deck prompt must be between 10 and 1000 characters.");
      return;
    }

    if (newDeckName.length < 3 || newDeckName.length > 1000) {
      setIsError(true);
      setErrorText("Deck name must be between 3 and 1000 characters.");
      return;
    }

    setIsLoading(true);
    ai_make_deck.mutate({
      prompt: ai_deck_prompt,
      deckname: newDeckName,
    });
  };
  const make_deck = api.deck.add_deck.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      setNewDeckName("");
      setdescription("");

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
        set_current_selectedDeck_id("");
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
        setNewDeckName("");
        setdescription("");
        await selected_deck.refetch();
        await mydecks.refetch();
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
                handle_make_deck(true);
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

          {can_use_ai_decks.data === true ? (
            <div>
              {" "}
              <div className="my-2">
                <CosmicButton
                  onClick={() => {
                    handle_ai_make_deck();
                  }}
                  text={" AI Deck creation (limit 1 per day)"}
                />
              </div>
              <input
                type="text"
                value={ai_deck_prompt}
                onChange={(e) => set_ai_deck_prompt(e.target.value)}
                placeholder="Enter AI deck prompt (max 1000 characters) e.g. 'A deck about space exploration.'"
                className="my-5 mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div className="my-2">
              <CosmicButton
                onClick={() => {
                  console.log("session", session?.user);
                }}
                text={"Awaiting Daily AI reset"}
              />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-2xl font-semibold">Add Question</h2>
          <select
            value={selected_deck.data?.id ?? ""}
            onChange={(e) => {
              console.log("printing E", e.target.value);
              set_current_selectedDeck_id(e.target.value);
            }}
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a deck</option>
            {mydecks.data && (
              <>
                {mydecks.data?.map((deck) => (
                  <option
                    key={deck.id}
                    value={deck.id}
                    onClick={() => {
                      console.log(deck);
                    }}
                  >
                    {deck.name}
                  </option>
                ))}
              </>
            )}
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
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-lg bg-gray-800 p-6"
      >
        <>
          <div className="m-2 flex p-2">
            <h2 className="mb-4 text-2xl font-semibold">Your Decks</h2>
            <div className="mx-5">
              <CosmicButton
                onClick={() => {
                  Toggle_Show_decks();
                }}
                text={"Toggle Decklist visibility"}
              />
            </div>
          </div>
          {ShowDecks === true && mydecks.data && mydecks.data.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mydecks.data.map((deck) => (
                <motion.div
                  key={deck.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex h-full flex-col overflow-hidden break-words rounded-md bg-gray-700 p-4"
                  onClick={() => {
                    console.log("deck", deck);
                    set_current_selectedDeck_id(deck.id);
                  }}
                >
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">
                      {deck.name} - {deck.isPublic ? "Public" : "Private"}
                    </h3>
                    <p>{deck.questions.length} questions</p>
                  </div>

                  <div className="mt-auto">
                    <div className="my-2">
                      <CosmicButton
                        onClick={() => {
                          handle_toggle_deck(deck.id);
                        }}
                        text={"Toggle Public/Private"}
                      />
                    </div>
                    {deckToDelete === deck.id ? (
                      <div className="flex flex-col items-start">
                        <input
                          type="text"
                          placeholder={`Type "${deck.name}" to confirm`}
                          value={typedName}
                          onChange={(e) => setTypedName(e.target.value)}
                          className="mb-2 rounded border bg-black p-1 text-white"
                        />
                        <button
                          className={`rounded-sm p-2 text-white ${
                            isNameMatched(deck.name)
                              ? "bg-red-700 hover:bg-red-800"
                              : "cursor-not-allowed bg-gray-400"
                          }`}
                          onClick={() =>
                            isNameMatched(deck.name) &&
                            handle_delete_deck(deck.id)
                          }
                          disabled={!isNameMatched(deck.name)}
                        >
                          Confirm Delete
                        </button>
                        <button
                          className="mt-2 rounded-sm bg-gray-300 p-2 text-black hover:bg-gray-400"
                          onClick={() => setDeckToDelete(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="flex rounded-sm bg-red-700 p-2 text-white hover:bg-red-800"
                        onClick={() => setDeckToDelete(deck.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      </motion.div>

      {selected_deck.data && (
        <div className="z-10 mt-2">
          <DeckQuestionsList
            deck={selected_deck.data}
            all_questions={selected_deck.data.questions}
            handle_delete_question={handle_delete_question}
          />
        </div>
      )}
    </div>
  );
}
