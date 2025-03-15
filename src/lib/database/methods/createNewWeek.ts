import type { WeekReport } from "$lib/weeksManaging/types";
import dbManager from "$lib/database/manager/manager";

export default async function createNewWeek(report: WeekReport): Promise<void> {
    await dbManager.saveWeek(report.id, report);
}
