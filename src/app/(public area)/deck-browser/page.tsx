"use client";

import { subDays, addDays } from "date-fns";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { CosmicButton } from "~/components/CosmicButton";
import { CosmicCalendar } from "~/components/CosmicCalendar";
import { DeckList } from "~/components/DeckDetails";
import { DeckQuestionsListPublic } from "~/components/DeckQuestionsListPublic";
import { api } from "~/trpc/react";

export default function DeckArchivePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 8),
    to: addDays(new Date(), 0),
  });

  const [show_results, setshow_results] = useState(true);
  const [selectedDeck_id, setSelectedDeck_id] = useState<string>("");

  const public_decks = api.deck.fetch_public_decks.useQuery({
    from: dateRange?.from ?? subDays(new Date(), 7),
    to: dateRange?.to ?? new Date(),
  });

  const selected_deck = api.deck.get_public_deck_by_id.useQuery({
    id: selectedDeck_id,
  });

  function ToggleResults() {
    setshow_results(!show_results);
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-cyan-300 md:text-4xl">
          Multiversal Deck Archive
        </h1>
        <div className="flex justify-center">
          <div className="w-full rounded-lg bg-white/10 p-3 md:p-5">
            <CosmicCalendar
              dateRange={dateRange}
              onDateRangeSelect={setDateRange}
            />
          </div>
        </div>
        {selected_deck.data && (
          <div className="my-4 flex justify-center">
            <CosmicButton onClick={ToggleResults} text="Toggle DeckList" />
          </div>
        )}
        {public_decks.data && show_results && (
          <div className="mt-4 w-full p-3 md:p-5">
            <DeckList
              decks={public_decks.data}
              selectedDeck={selected_deck.data ?? null}
              onDeckSelect={setSelectedDeck_id}
            />
          </div>
        )}
        {public_decks.data && selected_deck.data && (
          <div className="mt-4 w-full p-3 md:p-5">
            <DeckQuestionsListPublic
              deck={selected_deck.data}
              all_questions={selected_deck.data.questions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
