/* eslint-disable drizzle/enforce-update-with-where */
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import {
  actual_users,
  ai_refresh_cronjob_Runs,
  cronjob_Runs,
  match,
} from "~/server/db/schema";
import { shouldRunJob } from "random-functions/backend/backend1";
import { eq } from "drizzle-orm";

export async function POST(_request: Request) {
  console.log("attempting cron job to clean the DB");
  const currentTime = new Date();
  try {
    const should_run_cron = await shouldRunJob();

    if (should_run_cron.should_run_Cleaning_cron === true) {
      await db.delete(match).where(eq(match.scheduled_for_deletion, true));

      await db.update(match).set({
        scheduled_for_deletion: true,
      });

      await db.insert(cronjob_Runs).values({
        runDate: currentTime,
      });
    }

    if (should_run_cron.should_run_ai_refresh === true) {
      await db.update(actual_users).set({
        can_create_AI_decks: true,
      });

      await db.insert(ai_refresh_cronjob_Runs).values({
        runDate: currentTime,
      });
    }

    return NextResponse.json({
      received: true,
      status: 200,
      SkippedClean: should_run_cron.should_run_Cleaning_cron ? false : true,
      SkippedRefresh: should_run_cron.should_run_ai_refresh ? false : true,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Failed to process data", error: error as Error },
      { status: 400 },
    );
  }
}
