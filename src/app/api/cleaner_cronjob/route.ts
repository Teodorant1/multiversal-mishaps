/* eslint-disable drizzle/enforce-update-with-where */
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { cronjob_Runs, match } from "~/server/db/schema";
import { shouldRunJob } from "random-functions/backend/backend1";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  console.log("attempting cron job");
  try {
    const should_run_cron = await shouldRunJob();
    if (should_run_cron === true) {
      // we might need this to debug later
      // if (1 > 0) {

      await db.delete(match).where(eq(match.scheduled_for_deletion, true));

      await db.update(match).set({
        scheduled_for_deletion: true,
      });

      const currentTime = new Date();
      await db.insert(cronjob_Runs).values({
        runDate: currentTime,
      });
      return NextResponse.json({ received: true, status: 200, Skipped: false });
    }

    return NextResponse.json({
      received: true,
      status: 200,
      Skipped: true,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Failed to process data", error: error as Error },
      { status: 400 },
    );
  }
}
