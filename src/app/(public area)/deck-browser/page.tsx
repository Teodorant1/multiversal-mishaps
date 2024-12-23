"use client";

import { subDays, addDays } from "date-fns";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { CosmicButton } from "~/components/CosmicButton";
import { CosmicCalendar } from "~/components/CosmicCalendar";
import { DeckList } from "~/components/DeckDetails";
import { DeckQuestionsListPublic } from "~/components/DeckQuestionsListPublic";
import { api } from "~/trpc/react";

// Example data - in a real app, this would come from an API

export default function DeckArchivePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: addDays(new Date(), 0),
  });

  const [show_results, setshow_results] = useState(true);
  const [selectedDeck_id, setSelectedDeck_id] = useState<string>("");
  const public_decks = api.deck.fetch_public_decks.useQuery({
    from: dateRange!.from!,
    to: dateRange!.to!,
  });
  const selected_deck = api.deck.get_public_deck_by_id.useQuery({
    id: selectedDeck_id,
  });

  function ToggleResults() {
    setshow_results(!show_results);
  }

  return (
    <div className="min-h-screen p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full">
        <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
          Multiversal Deck Archive
        </h1>
        <div className="">
          {/* Calendar Column */}
          <div className="m-5 p-5">
            <CosmicCalendar
              dateRange={dateRange}
              onDateRangeSelect={setDateRange}
            />
          </div>
          {/* Deck List Column */}
          {selected_deck.data && (
            <div className="my-2 flex">
              <CosmicButton
                classname="mx-auto"
                onClick={() => {
                  ToggleResults();
                }}
                text={"Toggle DeckList"}
              />
            </div>
          )}{" "}
          {public_decks.data && show_results === true && (
            <div className="m-5 p-5">
              <DeckList
                decks={public_decks.data}
                selectedDeck={selected_deck.data ?? null}
                onDeckSelect={setSelectedDeck_id}
              />
            </div>
          )}{" "}
          {/* Deck Details Column */}
          {public_decks.data && selected_deck.data && (
            <div className="m-5 p-5">
              <DeckQuestionsListPublic
                deck={selected_deck.data}
                all_questions={selected_deck.data.questions}
              />
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
