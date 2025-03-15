import type { WeekReport } from "$lib/weeksManaging/types";
import dbManager from "$lib/database/manager/manager";

export default async function getWeek(weekId: string): Promise<WeekReport | undefined> {
    const data = await dbManager.getWeek(weekId);
    if (data === undefined) {
        console.error("No data found for the week", weekId);
        return undefined;
    } else return data;
}
