import type { WeeklyReport } from "$lib/weeksManaging/types";
import updateWeek from "./updateWeek";

export default async function createNewWeek(report: WeeklyReport): Promise<void> {
    await updateWeek("weekId", report);
}
