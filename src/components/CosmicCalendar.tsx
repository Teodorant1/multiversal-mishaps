"use client";

import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { type CosmicCalendarProps } from "~/types/projecttypes";

export function CosmicCalendar({
  onDateRangeSelect,
  dateRange,
}: CosmicCalendarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto w-full max-w-[350px] rounded-lg border border-cyan-500/20 bg-gray-900/80 p-2"
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[0, 90, 180, 270].map((rotation) => (
        <motion.div
          key={rotation}
          className="absolute h-6 w-6"
          style={{
            rotate: rotation,
            ...(rotation === 0 && { top: -3, right: -3 }),
            ...(rotation === 90 && { bottom: -3, right: -3 }),
            ...(rotation === 180 && { bottom: -3, left: -3 }),
            ...(rotation === 270 && { top: -3, left: -3 }),
          }}
        >
          <motion.div
            className="h-full w-full border-l border-t border-cyan-500/50"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: rotation / 360,
            }}
          />
        </motion.div>
      ))}

      <div className="relative">
        <h2 className="mb-4 text-center text-xl font-bold text-cyan-300">
          Temporal Nexus Navigator
        </h2>
        <div className="rounded-md border border-cyan-500/20 bg-gray-900/50 p-3 text-cyan-50">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeSelect}
            numberOfMonths={2}
            className="rounded-md border border-cyan-500/20 bg-gray-900/50 text-cyan-50"
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-fit bg-gray-900/50",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-cyan-200",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-cyan-400 hover:bg-cyan-800/50 rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-cyan-400 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-cyan-800/50 rounded-md text-cyan-100",
              day_range_start:
                "day-range-start bg-cyan-600 text-cyan-50 hover:bg-cyan-500",
              day_range_end:
                "day-range-end bg-cyan-600 text-cyan-50 hover:bg-cyan-500",
              day_selected:
                "bg-cyan-600 text-cyan-50 hover:bg-cyan-500 focus:bg-cyan-500",
              day_today: "bg-cyan-900 text-cyan-50",
              day_outside: "text-cyan-100/50 opacity-50",
              day_disabled: "text-gray-500",
              day_range_middle:
                "aria-selected:bg-cyan-900/50 aria-selected:text-cyan-50",
              day_hidden: "invisible",
            }}
          />
        </div>
        {dateRange && (dateRange.from ?? dateRange.to) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center font-mono text-cyan-400"
          >
            Selected Range:{" "}
            {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "..."}
            {" to "}
            {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "..."}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
